// Controlador principal del juego
class Game {
    constructor() {
        this.engine = new GameEngine();
        this.currentLevelIndex = 0;
        this.completedLevels = this.loadProgress();
        this.initializeElements();
        this.attachEventListeners();
        this.loadLevel(0);
    }

    initializeElements() {
        // Elementos del DOM
        this.elements = {
            gameGrid: document.getElementById('gameGrid'),
            codeEditor: document.getElementById('codeEditor'),
            lineNumbers: document.getElementById('lineNumbers'),
            console: document.getElementById('console'),
            currentLevel: document.getElementById('currentLevel'),
            movesCount: document.getElementById('movesCount'),
            missionText: document.getElementById('missionText'),
            
            // Botones
            runBtn: document.getElementById('runBtn'),
            resetBtn: document.getElementById('resetBtn'),
            stepBtn: document.getElementById('stepBtn'),
            clearConsole: document.getElementById('clearConsole'),
            helpToggle: document.getElementById('helpToggle'),
            
            // Modales
            victoryModal: document.getElementById('victoryModal'),
            errorModal: document.getElementById('errorModal'),
            errorMessage: document.getElementById('errorMessage'),
            finalMoves: document.getElementById('finalMoves'),
            nextLevelBtn: document.getElementById('nextLevelBtn'),
            replayBtn: document.getElementById('replayBtn'),
            closeErrorBtn: document.getElementById('closeErrorBtn'),
            
            // Menú de niveles
            levelMenuBtn: document.getElementById('levelMenuBtn'),
            levelMenuModal: document.getElementById('levelMenuModal'),
            closeLevelMenuBtn: document.getElementById('closeLevelMenuBtn'),
            levelGrid: document.getElementById('levelGrid'),
            
            // Paneles
            helpPanel: document.getElementById('helpPanel')
        };
    }

    attachEventListeners() {
        // Botón ejecutar
        this.elements.runBtn.addEventListener('click', () => this.runCode());
        
        // Botón reiniciar
        this.elements.resetBtn.addEventListener('click', () => this.resetLevel());
        
        // Botón paso a paso
        this.elements.stepBtn.addEventListener('click', () => this.runStepByStep());
        
        // Limpiar consola
        this.elements.clearConsole.addEventListener('click', () => this.clearConsole());
        
        // Toggle ayuda
        this.elements.helpToggle.addEventListener('click', () => {
            this.elements.helpPanel.classList.toggle('collapsed');
        });
        
        // Modales
        this.elements.nextLevelBtn.addEventListener('click', () => this.nextLevel());
        this.elements.replayBtn.addEventListener('click', () => this.replayLevel());
        this.elements.closeErrorBtn.addEventListener('click', () => this.hideErrorModal());
        
        // Menú de niveles
        this.elements.levelMenuBtn.addEventListener('click', () => this.showLevelMenu());
        this.elements.closeLevelMenuBtn.addEventListener('click', () => this.hideLevelMenu());
        
        // Actualizar números de línea al escribir
        this.elements.codeEditor.addEventListener('input', () => this.updateLineNumbers());
        this.elements.codeEditor.addEventListener('scroll', () => this.syncScroll());
        
        // Atajos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
            if (e.key === 'Escape') {
                this.hideErrorModal();
                this.hideVictoryModal();
            }
        });
    }

    loadLevel(levelIndex) {
        if (levelIndex < 0 || levelIndex >= LEVELS.length) {
            this.log('¡Has completado todos los niveles!', 'success');
            return;
        }

        this.currentLevelIndex = levelIndex;
        const level = LEVELS[levelIndex];
        
        this.engine.loadLevel(level);
        this.elements.currentLevel.textContent = levelIndex + 1;
        this.elements.missionText.textContent = level.mission;
        
        // Cargar código inicial
        if (level.startCode) {
            this.elements.codeEditor.value = level.startCode;
            this.updateLineNumbers();
        }
        
        this.clearConsole();
        this.renderGrid();
        this.updateMoves(0);
        
        this.log(`Nivel ${levelIndex + 1}: ${level.name}`, 'info');
        this.log(level.mission, 'info');
        
        if (level.hints && level.hints.length > 0) {
            this.log('💡 Pistas:', 'warning');
            level.hints.forEach(hint => this.log(`  • ${hint}`, 'warning'));
        }
    }

    renderGrid() {
        const level = LEVELS[this.currentLevelIndex];
        const state = this.engine.getState();
        const laserCells = this.engine.getEnemyLaserCells();
        const laserSet = new Set(laserCells.map(cell => `${cell.x},${cell.y}`));
        
        this.elements.gameGrid.innerHTML = '';
        this.elements.gameGrid.style.gridTemplateColumns = `repeat(${level.width}, var(--grid-size))`;
        this.elements.gameGrid.style.gridTemplateRows = `repeat(${level.height}, var(--grid-size))`;
        
        // Crear celdas
        for (let y = 0; y < level.height; y++) {
            for (let x = 0; x < level.width; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                // Verificar si es pared
                if (this.isCellWall(x, y, state.walls)) {
                    cell.classList.add('wall');
                }
                
                // Verificar si es salida
                if (x === state.exit.x && y === state.exit.y) {
                    cell.classList.add('exit');
                }
                if (state.portals && state.portals.some(p => p.x === x && p.y === y)) {
                    cell.classList.add('portal');
                }
                if (laserSet.has(`${x},${y}`)) {
                    cell.classList.add('enemy-laser');
                }
                
                // Verificar si hay roca
                const rock = state.rocks.find(r => r.x === x && r.y === y);
                if (rock) {
                    cell.classList.add('rock', rock.type);
                    if (Array.isArray(rock.movingPattern)) {
                        cell.classList.add('moving-asteroid');
                    }
                }
                
                this.elements.gameGrid.appendChild(cell);
            }
        }
        
        // Renderizar jugador
        this.renderPlayer(state.player);
        this.renderEnemies(state.enemies);
    }

    renderPlayer(player) {
        // Eliminar jugador anterior
        const oldPlayer = this.elements.gameGrid.querySelector('.ship.player-ship');
        if (oldPlayer) {
            oldPlayer.remove();
        }
        
        // Crear nuevo jugador
        const ship = document.createElement('div');
        ship.className = `ship player-ship ${player.name}`;
        if (player.ghostMode > 0) {
            ship.classList.add('ghost');
        }
        
        // Agregar atributo de rotación para el CSS
        ship.setAttribute('data-rotation', player.rotation);
        
        // Posicionar
        const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'));
        ship.style.left = `${player.x * (cellSize + 3) + cellSize / 2}px`;
        ship.style.top = `${player.y * (cellSize + 3) + cellSize / 2}px`;
        
        this.elements.gameGrid.appendChild(ship);
    }

    renderEnemies(enemies) {
        this.elements.gameGrid.querySelectorAll('.ship.enemy-ship').forEach(node => node.remove());
        const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'));

        enemies.forEach(enemy => {
            const ship = document.createElement('div');
            ship.className = 'ship enemy-ship';
            ship.setAttribute('data-rotation', enemy.rotation || 90);
            ship.style.left = `${enemy.x * (cellSize + 3) + cellSize / 2}px`;
            ship.style.top = `${enemy.y * (cellSize + 3) + cellSize / 2}px`;
            this.elements.gameGrid.appendChild(ship);
        });
    }

    isCellWall(x, y, walls) {
        return walls.some(wall => {
            return x >= wall.x && x < wall.x + wall.width &&
                   y >= wall.y && y < wall.y + wall.height;
        });
    }

    async runCode() {
        if (this.engine.isExecutingCommands()) {
            this.log('⚠️ Ya hay código ejecutándose', 'warning');
            return;
        }

        const code = this.elements.codeEditor.value.trim();
        if (!code) {
            this.showError('Por favor, escribe algún código XML primero.');
            return;
        }

        this.clearConsole();
        this.log('🚀 Ejecutando código...', 'info');
        this.elements.runBtn.disabled = true;

        try {
            const commands = this.engine.parseXMLCommands(code);
            this.log(`✅ XML válido. ${commands.length} comando(s) encontrado(s)`, 'success');
            
            await this.engine.executeCommands(
                commands,
                (cmd, result, step, total) => this.onCommandStep(cmd, result, step, total),
                (state) => this.onExecutionComplete(state),
                (error) => this.onExecutionError(error)
            );
        } catch (error) {
            this.onExecutionError(error.message);
        } finally {
            this.elements.runBtn.disabled = false;
        }
    }

    async onCommandStep(command, result, step, total) {
        const cmdText = this.formatCommand(command);
        this.log(`[${step}/${total}] ${cmdText}`, 'info');
        
        if (result.message) {
            this.log(`  → ${result.message}`, result.success ? 'success' : 'warning');
        }
        
        // Actualizar vista
        const state = this.engine.getState();
        this.renderPlayer(state.player);
        this.updateMoves(state.moves);
        
        // Animación de disparo
        if (command.type === 'shoot') {
            await this.animateShoot(state.player);
            // Re-renderizar grid después del disparo
            this.renderGrid();
        }
    }

    onExecutionComplete(state) {
        if (state.completed) {
            this.log('🎉 ¡Nivel completado!', 'success');
            this.markLevelCompleted(this.currentLevelIndex);
            this.showVictory(state.moves);
        } else {
            this.log('✅ Ejecución completada', 'success');
            this.log('❌ No alcanzaste la salida. Intenta de nuevo.', 'error');
        }
    }

    onExecutionError(errorMessage) {
        this.log(`❌ Error: ${errorMessage}`, 'error');
        this.showError(errorMessage);
    }

    formatCommand(command) {
        switch (command.type) {
            case 'move':
                return `<move distance="${command.distance}"/>`;
            case 'rotate':
                return `<rotate direction="${command.direction}"/>`;
            case 'shoot':
                return `<shoot/>`;
            case 'ghost':
                return `<ghost time="${command.time}"/>`;
            default:
                return command.type;
        }
    }

    resetLevel() {
        this.engine.reset();
        this.renderGrid();
        this.updateMoves(0);
        this.clearConsole();
        this.log('🔄 Nivel reiniciado', 'info');
    }

    nextLevel() {
        this.hideVictoryModal();
        this.loadLevel(this.currentLevelIndex + 1);
    }

    replayLevel() {
        this.hideVictoryModal();
        this.resetLevel();
    }

    // UI Updates
    updateMoves(moves) {
        this.elements.movesCount.textContent = moves;
    }

    updateLineNumbers() {
        const lines = this.elements.codeEditor.value.split('\n').length;
        const numbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
        this.elements.lineNumbers.textContent = numbers;
    }

    syncScroll() {
        this.elements.lineNumbers.scrollTop = this.elements.codeEditor.scrollTop;
    }

    // Console
    log(message, type = 'info') {
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.textContent = message;
        this.elements.console.appendChild(line);
        this.elements.console.scrollTop = this.elements.console.scrollHeight;
    }

    clearConsole() {
        this.elements.console.innerHTML = '';
    }

    // Modals
    showVictory(moves) {
        this.elements.finalMoves.textContent = moves;
        this.elements.victoryModal.classList.remove('hidden');
        
        // Ocultar botón de siguiente nivel si es el último
        if (this.currentLevelIndex >= LEVELS.length - 1) {
            this.elements.nextLevelBtn.style.display = 'none';
        } else {
            this.elements.nextLevelBtn.style.display = 'inline-flex';
        }
    }

    hideVictoryModal() {
        this.elements.victoryModal.classList.add('hidden');
    }

    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorModal.classList.remove('hidden');
    }

    hideErrorModal() {
        this.elements.errorModal.classList.add('hidden');
    }

    async runStepByStep() {
        this.log('⏯️ Modo paso a paso no implementado aún', 'warning');
        // TODO: Implementar ejecución paso a paso con pausas
    }

    // Animación de disparo
    async animateShoot(player) {
        const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'));
        const vector = getDirectionVector(player.rotation);
        
        // Posición inicial (desde la nave)
        const startX = player.x * (cellSize + 3) + cellSize / 2;
        const startY = player.y * (cellSize + 3) + cellSize / 2;
        
        // Posición final (celda objetivo)
        const targetX = (player.x + vector.dx) * (cellSize + 3) + cellSize / 2;
        const targetY = (player.y + vector.dy) * (cellSize + 3) + cellSize / 2;
        
        // Crear proyectil
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.left = `${startX}px`;
        bullet.style.top = `${startY}px`;
        this.elements.gameGrid.appendChild(bullet);
        
        // Crear efecto de trail
        const createTrail = () => {
            const trail = document.createElement('div');
            trail.className = 'bullet-trail';
            trail.style.left = bullet.style.left;
            trail.style.top = bullet.style.top;
            this.elements.gameGrid.appendChild(trail);
            setTimeout(() => trail.remove(), 500);
        };
        
        // Animar proyectil
        return new Promise(resolve => {
            let progress = 0;
            const duration = 300; // ms
            const startTime = Date.now();
            
            const trailInterval = setInterval(createTrail, 30);
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                progress = Math.min(elapsed / duration, 1);
                
                const currentX = startX + (targetX - startX) * progress;
                const currentY = startY + (targetY - startY) * progress;
                
                bullet.style.left = `${currentX}px`;
                bullet.style.top = `${currentY}px`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    clearInterval(trailInterval);
                    // Efecto de impacto
                    bullet.style.transform = 'scale(2)';
                    bullet.style.opacity = '0';
                    setTimeout(() => {
                        bullet.remove();
                        resolve();
                    }, 100);
                }
            };
            
            animate();
        });
    }
    
    // Sistema de progreso
    loadProgress() {
        const saved = localStorage.getItem('lostinspace_progress');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveProgress() {
        localStorage.setItem('lostinspace_progress', JSON.stringify(this.completedLevels));
    }
    
    markLevelCompleted(levelIndex) {
        if (!this.completedLevels.includes(levelIndex)) {
            this.completedLevels.push(levelIndex);
            this.saveProgress();
        }
    }
    
    // Menú de niveles
    showLevelMenu() {
        this.renderLevelMenu();
        this.elements.levelMenuModal.classList.remove('hidden');
    }
    
    hideLevelMenu() {
        this.elements.levelMenuModal.classList.add('hidden');
    }
    
    renderLevelMenu() {
        this.elements.levelGrid.innerHTML = '';
        
        LEVELS.forEach((level, index) => {
            const card = document.createElement('div');
            card.className = 'level-card';
            
            const isCompleted = this.completedLevels.includes(index);
            const isCurrent = index === this.currentLevelIndex;
            const isLocked = index > 0 && !this.completedLevels.includes(index - 1);
            
            if (isCompleted) card.classList.add('completed');
            if (isCurrent) card.classList.add('current');
            if (isLocked) card.classList.add('locked');
            
            // Número del nivel
            const number = document.createElement('div');
            number.className = 'level-number';
            number.textContent = index + 1;
            
            // Nombre del nivel
            const name = document.createElement('div');
            name.className = 'level-name';
            name.textContent = level.name;
            
            // Dificultad (estrellas)
            const difficulty = document.createElement('div');
            difficulty.className = 'level-difficulty';
            const stars = this.getLevelDifficulty(index);
            difficulty.textContent = '⭐'.repeat(stars);
            
            // Estado
            const status = document.createElement('div');
            status.className = 'level-status';
            if (isCompleted) {
                status.textContent = '✅';
            } else if (isCurrent) {
                status.textContent = '▶️';
            } else if (isLocked) {
                status.textContent = '🔒';
            }
            
            card.appendChild(status);
            card.appendChild(number);
            card.appendChild(name);
            card.appendChild(difficulty);
            
            // Click handler
            if (!isLocked) {
                card.addEventListener('click', () => {
                    this.hideLevelMenu();
                    this.loadLevel(index);
                });
            }
            
            this.elements.levelGrid.appendChild(card);
        });
    }
    
    getLevelDifficulty(levelIndex) {
        const difficulties = [1, 2, 3, 4, 4, 4, 4, 3, 4, 5];
        return difficulties[levelIndex] || 3;
    }
}

// Inicializar juego cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.game = game; // Para debugging
    console.log('🚀 Lost In Space cargado correctamente');
    console.log('Presiona Ctrl+Enter para ejecutar código');
});
