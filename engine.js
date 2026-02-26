// Motor del juego Lost In Space
class GameEngine {
    constructor() {
        this.currentLevel = null;
        this.gameState = {
            player: null,
            enemies: [],
            rocks: [],
            walls: [],
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
            enemies: levelData.enemies.map(e => ({ ...e })),
            rocks: levelData.rocks.map(r => ({ ...r, health: r.health || 1 })),
            walls: levelData.walls.map(w => ({ ...w })),
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

            player.x = newX;
            player.y = newY;
            actualMoves++;
        }

        return {
            success: true,
            message: `Movido ${actualMoves} casilla(s)${player.ghostMode > 0 ? ' (modo fantasma)' : ''}`
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
