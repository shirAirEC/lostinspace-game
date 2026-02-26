// Motor del juego Lost In Space
class GameEngine {
    constructor() {
        this.currentLevel = null;
        this.gameState = {
            player: null,
            enemies: [],
            rocks: [],
            walls: [],
            portals: [],
            exit: null,
            grid: [],
            ghostMode: 0,
            moves: 0,
            completed: false
        };
        this.animationSpeed = 500; // ms por movimiento
        this.isExecuting = false;
        this.stepByStep = false;
    }

    // Inicializar nivel
    loadLevel(levelData) {
        this.currentLevel = JSON.parse(JSON.stringify(levelData));
        this.gameState = {
            player: { ...levelData.player, ghostMode: 0 },
            enemies: (levelData.enemies || []).map(e => ({
                ...e,
                patternIndex: 0
            })),
            rocks: levelData.rocks.map(r => ({
                ...r,
                health: r.health || 1,
                patternIndex: 0
            })),
            walls: levelData.walls.map(w => ({ ...w })),
            portals: (levelData.portals || []).map(p => ({ ...p })),
            exit: { ...levelData.exit },
            moves: 0,
            completed: false
        };
        return this.gameState;
    }

    // Parsear XML a comandos
    parseXMLCommands(xmlString) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            
            // Verificar errores de parseo
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('XML mal formado: ' + parserError.textContent);
            }

            const actionsNode = xmlDoc.querySelector('actions');
            if (!actionsNode) {
                throw new Error('No se encontró el elemento <actions>');
            }

            const commands = [];
            const children = actionsNode.children;

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const command = this.parseCommand(child);
                if (command) {
                    commands.push(command);
                }
            }

            if (commands.length === 0) {
                throw new Error('No se encontraron comandos válidos dentro de <actions>');
            }

            return commands;
        } catch (error) {
            throw new Error('Error al parsear XML: ' + error.message);
        }
    }

    parseCommand(node) {
        const tagName = node.tagName.toLowerCase();
        
        switch (tagName) {
            case 'move':
                const distance = parseInt(node.getAttribute('distance')) || 1;
                return { type: 'move', distance };
            
            case 'rotate':
                const direction = node.getAttribute('direction') || 'cw';
                if (direction !== 'cw' && direction !== 'ccw') {
                    throw new Error(`Dirección de rotación inválida: ${direction}. Usa 'cw' o 'ccw'.`);
                }
                return { type: 'rotate', direction };
            
            case 'shoot':
                return { type: 'shoot' };
            
            case 'ghost':
                const time = parseInt(node.getAttribute('time')) || 1;
                return { type: 'ghost', time };
            
            default:
                // Ignorar comentarios y nodos de texto
                if (node.nodeType === 1) { // Solo elementos
                    console.warn(`Comando desconocido: ${tagName}`);
                }
                return null;
        }
    }

    // Ejecutar comandos
    async executeCommands(commands, onStep, onComplete, onError) {
        if (this.isExecuting) {
            onError('Ya hay una ejecución en curso');
            return;
        }

        this.isExecuting = true;
        this.gameState.moves = 0;

        try {
            for (let i = 0; i < commands.length; i++) {
                const command = commands[i];
                
                // Actualizar modo fantasma
                if (this.gameState.player.ghostMode > 0) {
                    this.gameState.player.ghostMode--;
                }

                const result = await this.executeCommand(command);
                this.advanceHazards();
                this.checkHazardDamage();
                
                if (onStep) {
                    await onStep(command, result, i + 1, commands.length);
                }

                // Esperar entre comandos
                if (i < commands.length - 1) {
                    await this.sleep(this.animationSpeed);
                }

                // Verificar victoria
                if (this.checkVictory()) {
                    this.gameState.completed = true;
                    break;
                }
            }

            if (onComplete) {
                onComplete(this.gameState);
            }
        } catch (error) {
            if (onError) {
                onError(error.message);
            }
        } finally {
            this.isExecuting = false;
        }
    }

    async executeCommand(command) {
        this.gameState.moves++;
        const player = this.gameState.player;

        switch (command.type) {
            case 'move':
                return this.executeMove(player, command.distance);
            
            case 'rotate':
                return this.executeRotate(player, command.direction);
            
            case 'shoot':
                return this.executeShoot(player);
            
            case 'ghost':
                return this.executeGhost(player, command.time);
            
            default:
                throw new Error(`Comando no implementado: ${command.type}`);
        }
    }

    executeMove(player, distance) {
        const vector = getDirectionVector(player.rotation);
        let actualMoves = 0;
        let teleports = 0;

        for (let i = 0; i < distance; i++) {
            const newX = player.x + vector.dx;
            const newY = player.y + vector.dy;

            // Verificar límites
            if (newX < 0 || newX >= this.currentLevel.width || 
                newY < 0 || newY >= this.currentLevel.height) {
                throw new Error(`¡Choque! Intentaste salir del mapa en (${newX}, ${newY})`);
            }

            // Verificar colisión con paredes (si no está en modo fantasma)
            if (player.ghostMode === 0 && this.checkWallCollision(newX, newY)) {
                throw new Error(`¡Choque con pared! No puedes atravesar paredes en (${newX}, ${newY})`);
            }

            // Verificar colisión con rocas (si no está en modo fantasma)
            if (player.ghostMode === 0 && this.checkRockCollision(newX, newY)) {
                throw new Error(`¡Choque con roca! Destruye las rocas con <shoot/> primero en (${newX}, ${newY})`);
            }
            if (player.ghostMode === 0 && this.checkEnemyCollision(newX, newY)) {
                throw new Error(`¡Choque con nave enemiga en (${newX}, ${newY})!`);
            }

            player.x = newX;
            player.y = newY;
            actualMoves++;

            const portal = this.getPortalAt(player.x, player.y);
            if (portal) {
                if (this.checkWallCollision(portal.toX, portal.toY)) {
                    throw new Error('El portal está bloqueado por una pared.');
                }
                if (this.checkRockCollision(portal.toX, portal.toY)) {
                    throw new Error('El portal está bloqueado por una roca.');
                }
                if (this.checkEnemyCollision(portal.toX, portal.toY)) {
                    throw new Error('El portal está bloqueado por una nave enemiga.');
                }
                player.x = portal.toX;
                player.y = portal.toY;
                teleports++;
            }

            if (player.ghostMode === 0 && this.isLaserCell(player.x, player.y)) {
                throw new Error('¡Te alcanzó un disparo enemigo!');
            }
        }

        return {
            success: true,
            message: `Movido ${actualMoves} casilla(s)${teleports > 0 ? ` y teletransportado ${teleports} vez/veces` : ''}${player.ghostMode > 0 ? ' (modo fantasma)' : ''}`
        };
    }

    executeRotate(player, direction) {
        player.rotation = rotateDirection(player.rotation, direction);
        const dirName = direction === 'cw' ? 'derecha' : 'izquierda';
        return {
            success: true,
            message: `Rotado a la ${dirName} → ${getRotationSymbol(player.rotation)}`
        };
    }

    executeShoot(player) {
        const vector = getDirectionVector(player.rotation);
        const targetX = player.x + vector.dx;
        const targetY = player.y + vector.dy;

        // Buscar enemigo en la posición objetivo
        const enemyIndex = this.gameState.enemies.findIndex(
            e => e.x === targetX && e.y === targetY
        );

        if (enemyIndex !== -1) {
            this.gameState.enemies.splice(enemyIndex, 1);
            return {
                success: true,
                message: `¡Enemigo destruido en (${targetX}, ${targetY})!`
            };
        }

        // Buscar roca en la posición objetivo
        const rockIndex = this.gameState.rocks.findIndex(
            r => r.x === targetX && r.y === targetY
        );

        if (rockIndex !== -1) {
            const rock = this.gameState.rocks[rockIndex];
            
            if (rock.type === 'white') {
                // Destruir roca blanca
                this.gameState.rocks.splice(rockIndex, 1);
                return {
                    success: true,
                    message: `¡Roca blanca destruida en (${targetX}, ${targetY})!`
                };
            } else {
                return {
                    success: false,
                    message: `La roca negra en (${targetX}, ${targetY}) es demasiado resistente`
                };
            }
        }

        return {
            success: false,
            message: `No hay nada que disparar en (${targetX}, ${targetY})`
        };
    }

    executeGhost(player, time) {
        player.ghostMode = time;
        return {
            success: true,
            message: `Modo fantasma activado por ${time} movimiento(s)`
        };
    }

    // Verificadores de colisión
    checkWallCollision(x, y) {
        return this.gameState.walls.some(wall => {
            return x >= wall.x && x < wall.x + wall.width &&
                   y >= wall.y && y < wall.y + wall.height;
        });
    }

    checkRockCollision(x, y) {
        return this.gameState.rocks.some(rock => rock.x === x && rock.y === y);
    }

    checkEnemyCollision(x, y) {
        return this.gameState.enemies.some(enemy => enemy.x === x && enemy.y === y);
    }

    getPortalAt(x, y) {
        return this.gameState.portals.find(portal => portal.x === x && portal.y === y) || null;
    }

    advanceHazards() {
        // Los enemigos permanecen en su posición; no se mueven al ejecutar comandos del jugador.
        // Esto evita que su turno esté acoplado al del usuario.
        this.gameState.rocks
            .filter(rock => Array.isArray(rock.movingPattern) && rock.movingPattern.length > 0)
            .forEach(rock => this.advanceEntity(rock, false));
    }

    advanceEntity(entity, isEnemy) {
        if (!Array.isArray(entity.pattern) && !Array.isArray(entity.movingPattern)) {
            return;
        }
        const pattern = entity.pattern || entity.movingPattern;
        const step = pattern[entity.patternIndex % pattern.length];
        entity.patternIndex = (entity.patternIndex + 1) % pattern.length;

        if (step.type === 'rotate') {
            entity.rotation = rotateDirection(entity.rotation || 90, step.direction || 'cw');
            return;
        }

        if (step.type === 'move') {
            const vector = getDirectionVector(entity.rotation || 90);
            const distance = step.distance || 1;

            for (let i = 0; i < distance; i++) {
                const nextX = entity.x + vector.dx;
                const nextY = entity.y + vector.dy;
                const blocked =
                    nextX < 0 || nextY < 0 ||
                    nextX >= this.currentLevel.width || nextY >= this.currentLevel.height ||
                    this.checkWallCollision(nextX, nextY) ||
                    (isEnemy && this.checkRockCollision(nextX, nextY));

                if (blocked) {
                    entity.rotation = rotateDirection(entity.rotation || 90, 'cw');
                    break;
                }

                entity.x = nextX;
                entity.y = nextY;
            }
        }
    }

    getEnemyLaserCells() {
        const cells = [];
        this.gameState.enemies.forEach(enemy => {
            if (!enemy.shoots) return;
            if (!this.canEnemySeePlayer(enemy)) return;

            const vector = getDirectionVector(enemy.rotation || 90);
            let x = enemy.x + vector.dx;
            let y = enemy.y + vector.dy;

            while (
                x >= 0 && y >= 0 &&
                x < this.currentLevel.width && y < this.currentLevel.height &&
                !this.checkWallCollision(x, y) &&
                !this.checkRockCollision(x, y)
            ) {
                cells.push({ x, y });
                x += vector.dx;
                y += vector.dy;
            }
        });
        return cells;
    }

    canEnemySeePlayer(enemy) {
        const player = this.gameState.player;
        const vector = getDirectionVector(enemy.rotation || 90);
        let x = enemy.x + vector.dx;
        let y = enemy.y + vector.dy;

        while (
            x >= 0 && y >= 0 &&
            x < this.currentLevel.width && y < this.currentLevel.height &&
            !this.checkWallCollision(x, y) &&
            !this.checkRockCollision(x, y)
        ) {
            if (x === player.x && y === player.y) {
                return true;
            }
            x += vector.dx;
            y += vector.dy;
        }

        return false;
    }

    isLaserCell(x, y) {
        return this.getEnemyLaserCells().some(cell => cell.x === x && cell.y === y);
    }

    checkHazardDamage() {
        const player = this.gameState.player;
        if (player.ghostMode > 0) return;
        if (this.checkEnemyCollision(player.x, player.y)) {
            throw new Error('¡Una nave enemiga te interceptó!');
        }
        if (this.isLaserCell(player.x, player.y)) {
            throw new Error('¡Te alcanzó un disparo enemigo!');
        }
    }

    checkVictory() {
        const player = this.gameState.player;
        const exit = this.gameState.exit;
        return player.x === exit.x && player.y === exit.y;
    }

    // Utilidades
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reset() {
        if (this.currentLevel) {
            this.loadLevel(this.currentLevel);
        }
    }

    getState() {
        return this.gameState;
    }

    isExecutingCommands() {
        return this.isExecuting;
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.GameEngine = GameEngine;
}
