// Definición de niveles basados en los XML originales del juego Lost In Space
const LEVELS = [
    // NIVEL 0: Tutorial - Movimiento básico
    {
        id: 0,
        name: "Tutorial - Primeros Pasos",
        width: 11,
        height: 9,
        mission: "Aprende a moverte. Lleva tu nave hasta la salida verde usando el comando <move distance='N'/>.",
        walls: [],
        rocks: [],
        exit: { x: 8, y: 4 },
        player: { x: 2, y: 4, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "La nave se mueve en la dirección hacia donde está mirando",
            "rotation: 90 = Este (→), 0 = Norte (↑), 180 = Sur (↓), 270 = Oeste (←)",
            "Tu nave está mirando hacia la derecha (→)"
        ]
    },

    // NIVEL 1: Introducción a rotaciones
    {
        id: 1,
        name: "Aprendiendo a Girar",
        width: 11,
        height: 9,
        mission: "Ahora necesitas girar. Usa <rotate direction='cw'/> (derecha) o 'ccw' (izquierda).",
        walls: [
            { x: 0, y: 0, width: 2, height: 9 },
            { x: 9, y: 0, width: 2, height: 9 },
            { x: 3, y: 0, width: 7, height: 3 },
            { x: 1, y: 4, width: 10, height: 5 }
        ],
        rocks: [],
        exit: { x: 8, y: 3 },
        player: { x: 2, y: 0, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "cw = clockwise (sentido horario, derecha)",
            "ccw = counter-clockwise (sentido antihorario, izquierda)",
            "Cada rotate gira 90 grados"
        ]
    },

    // NIVEL 2: Laberinto simple
    {
        id: 2,
        name: "Navegación por Laberinto",
        width: 13,
        height: 10,
        mission: "Navega por este laberinto. Combina movimientos y rotaciones con precisión.",
        walls: [
            { x: 0, y: 0, width: 4, height: 7 },
            { x: 0, y: 8, width: 4, height: 2 },
            { x: 6, y: 0, width: 7, height: 9 }
        ],
        rocks: [],
        exit: { x: 5, y: 8 },
        player: { x: 5, y: 3, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "Observa el patrón de paredes cuidadosamente",
            "Necesitarás múltiples rotaciones",
            "Planifica la ruta completa antes de ejecutar"
        ]
    },

    // NIVEL 3: Primer disparo
    {
        id: 3,
        name: "Introducción al Disparo",
        width: 11,
        height: 9,
        mission: "Aprende a disparar. Usa <shoot/> para destruir la roca blanca que bloquea tu camino.",
        walls: [
            { x: 0, y: 5, width: 11, height: 4 },
            { x: 0, y: 0, width: 5, height: 4 },
            { x: 6, y: 0, width: 5, height: 4 }
        ],
        rocks: [
            { x: 5, y: 4, size: 1, type: "white", health: 1 }
        ],
        exit: { x: 10, y: 4 },
        player: { x: 0, y: 4, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "El comando <shoot/> dispara en la dirección que miras",
            "Las rocas blancas se destruyen con un disparo",
            "No puedes atravesar rocas sin destruirlas primero"
        ]
    },

    // NIVEL 4: Laberinto complejo con disparos
    {
        id: 4,
        name: "Laberinto con Obstáculos",
        width: 11,
        height: 9,
        mission: "Combina rotaciones y disparos para atravesar este laberinto lleno de rocas.",
        walls: [
            { x: 0, y: 0, width: 1, height: 9 },
            { x: 0, y: 8, width: 11, height: 1 },
            { x: 10, y: 0, width: 1, height: 9 },
            { x: 2, y: 0, width: 9, height: 1 },
            { x: 2, y: 0, width: 1, height: 7 },
            { x: 2, y: 6, width: 7, height: 1 },
            { x: 8, y: 2, width: 1, height: 5 },
            { x: 4, y: 2, width: 5, height: 1 },
            { x: 4, y: 2, width: 1, height: 3 },
            { x: 4, y: 4, width: 3, height: 1 }
        ],
        rocks: [
            { x: 6, y: 3, size: 1, type: "white", health: 1 }
        ],
        exit: { x: 5, y: 3 },
        player: { x: 1, y: 0, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "Este laberinto es complejo - dibuja la ruta en papel",
            "Necesitarás disparar en el momento correcto",
            "Cuenta bien las casillas antes de moverte"
        ]
    },

    // NIVEL 5: Columna de rocas - precisión
    {
        id: 5,
        name: "El Corredor de Rocas",
        width: 11,
        height: 9,
        mission: "Atraviesa este corredor disparando solo la roca correcta.",
        walls: [
            { x: 8, y: 0, width: 3, height: 2 },
            { x: 10, y: 1, width: 1, height: 7 },
            { x: 8, y: 7, width: 3, height: 2 }
        ],
        rocks: [
            { x: 8, y: 2, size: 1, type: "white", health: 1 },
            { x: 8, y: 6, size: 1, type: "white", health: 1 },
            { x: 9, y: 2, size: 1, type: "black" },
            { x: 9, y: 3, size: 1, type: "black" },
            { x: 9, y: 4, size: 1, type: "white", health: 1 },
            { x: 9, y: 5, size: 1, type: "black" },
            { x: 9, y: 6, size: 1, type: "black" }
        ],
        exit: { x: 9, y: 4 },
        player: { x: 0, y: 4, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "La salida está EN la columna de rocas",
            "Solo una roca blanca lleva a la salida",
            "Las rocas negras son indestructibles"
        ]
    },

    // NIVEL 6: Múltiples caminos
    {
        id: 6,
        name: "Decisiones Estratégicas",
        width: 13,
        height: 10,
        mission: "Hay múltiples caminos. Elige el más eficiente evitando rocas negras.",
        walls: [
            { x: 0, y: 0, width: 6, height: 3 },
            { x: 5, y: 6, width: 8, height: 4 }
        ],
        rocks: [
            { x: 2, y: 8, size: 1, type: "black" },
            { x: 3, y: 5, size: 1, type: "black" },
            { x: 6, y: 2, size: 1, type: "white", health: 1 },
            { x: 5, y: 3, size: 1, type: "white", health: 1 },
            { x: 7, y: 4, size: 1, type: "white", health: 1 },
            { x: 8, y: 5, size: 1, type: "black" },
            { x: 10, y: 3, size: 1, type: "black" }
        ],
        exit: { x: 11, y: 1 },
        player: { x: 3, y: 8, rotation: 270, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "Hay un pasaje entre y=3 e y=5",
            "Analiza qué rocas DEBES disparar",
            "Busca el camino que requiera menos disparos"
        ]
    },

    // NIVEL 7: Corredor estrecho con múltiples disparos
    {
        id: 7,
        name: "Corredor de Precisión",
        width: 13,
        height: 9,
        mission: "Dispara múltiples rocas en secuencia, flanquea al enemigo y elimínalo para abrir el paso final.",
        walls: [
            { x: 0, y: 5, width: 11, height: 4 },
            { x: 0, y: 0, width: 5, height: 4 },
            { x: 6, y: 0, width: 7, height: 3 }
        ],
        rocks: [
            { x: 5, y: 4, size: 1, type: "white", health: 1 },
            { x: 7, y: 4, size: 1, type: "white", health: 1 },
            { x: 9, y: 4, size: 1, type: "white", health: 1 }
        ],
        exit: { x: 12, y: 4 },
        player: { x: 0, y: 4, rotation: 90, name: "captain" },
        enemies: [
            { x: 11, y: 3, rotation: 180, shoots: true, pattern: [{ type: "move", distance: 0 }] }
        ],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "Tres rocas blancas bloquean el camino",
            "La nave enemiga marca una línea de disparo peligrosa",
            "Hay un pasillo superior para flanquear al enemigo",
            "Puedes destruir al enemigo con <shoot/> desde la celda adyacente",
            "Calcula bien las distancias entre rocas"
        ]
    },

    // NIVEL 8: Patrón en L complejo
    {
        id: 8,
        name: "El Patrón en L",
        width: 12,
        height: 10,
        mission: "Usa un portal oculto bajo una roca blanca para pasar de una habitación a la otra y alcanzar la salida.",
        walls: [
            { x: 0, y: 0, width: 2, height: 10 },
            { x: 10, y: 0, width: 2, height: 10 },
            { x: 2, y: 0, width: 8, height: 2 },
            { x: 2, y: 8, width: 8, height: 2 },
            { x: 5, y: 2, width: 2, height: 6 }
        ],
        rocks: [
            { x: 3, y: 5, size: 1, type: "white", health: 1 },
            { x: 8, y: 5, size: 1, type: "white", health: 1 },
            { x: 4, y: 3, size: 1, type: "black" },
            { x: 8, y: 7, size: 1, type: "black" },
            {
                x: 7,
                y: 6,
                size: 1,
                type: "black",
                rotation: 270,
                movingPattern: [
                    { type: "move", distance: 1 },
                    { type: "rotate", direction: "cw" },
                    { type: "move", distance: 1 },
                    { type: "rotate", direction: "cw" }
                ]
            }
        ],
        portals: [
            { x: 3, y: 5, toX: 7, toY: 5 }
        ],
        exit: { x: 8, y: 3 },
        player: { x: 3, y: 3, rotation: 90, name: "captain" },
        enemies: [
            { x: 9, y: 2, rotation: 270, shoots: true, pattern: [{ type: "move", distance: 0 }] }
        ],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "La roca blanca de la habitación izquierda oculta un portal",
            "Destrúyela y pisa esa casilla para saltar de habitación",
            "Las rocas negras te obligan a tomar ciertas rutas",
            "Observa el asteroide móvil antes de ejecutar"
        ]
    },

    // NIVEL 9: Desafío Final - Gran laberinto
    {
        id: 9,
        name: "El Desafío Final",
        width: 14,
        height: 10,
        mission: "Nivel maestro. Usa navegación, disparos y estrategia contra enemigos y asteroides móviles.",
        walls: [
            { x: 0, y: 0, width: 14, height: 2 },
            { x: 0, y: 8, width: 14, height: 2 },
            { x: 0, y: 0, width: 2, height: 10 },
            { x: 12, y: 0, width: 2, height: 10 },
            { x: 5, y: 3, width: 4, height: 4 },
            { x: 3, y: 5, width: 2, height: 1 },
            { x: 9, y: 5, width: 2, height: 1 }
        ],
        rocks: [
            { x: 3, y: 4, size: 1, type: "white", health: 1 },
            { x: 3, y: 5, size: 1, type: "black" },
            { x: 10, y: 4, size: 1, type: "white", health: 1 },
            { x: 10, y: 5, size: 1, type: "black" },
            { x: 7, y: 2, size: 1, type: "white", health: 1 },
            { x: 7, y: 7, size: 1, type: "white", health: 1 },
            { x: 4, y: 3, size: 1, type: "black" },
            { x: 9, y: 6, size: 1, type: "black" },
            {
                x: 6,
                y: 6,
                size: 1,
                type: "black",
                rotation: 0,
                movingPattern: [
                    { type: "move", distance: 1 },
                    { type: "rotate", direction: "cw" },
                    { type: "move", distance: 1 },
                    { type: "rotate", direction: "cw" }
                ]
            }
        ],
        exit: { x: 11, y: 5 },
        player: { x: 2, y: 5, rotation: 90, name: "captain" },
        enemies: [
            {
                x: 11,
                y: 3,
                rotation: 270,
                shoots: true,
                pattern: [
                    { type: "move", distance: 1 },
                    { type: "move", distance: 1 },
                    { type: "rotate", direction: "cw" },
                    { type: "move", distance: 1 },
                    { type: "move", distance: 1 },
                    { type: "rotate", direction: "cw" }
                ]
            },
            { x: 2, y: 2, rotation: 90, shoots: true, pattern: [{ type: "move", distance: 0 }] }
        ],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "Este nivel requiere una secuencia perfecta",
            "Hay múltiples rutas posibles - encuentra la óptima",
            "Combina todas las habilidades: movimiento, rotación y disparo",
            "No hay margen de error - planifica bien cada paso",
            "Evita las líneas de disparo enemigas"
        ]
    }
];

// Constantes de dirección
const DIRECTIONS = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270
};

// Función para obtener dificultad del nivel (para el menú)
function getLevelDifficulty(levelId) {
    const difficulties = [1, 1, 2, 3, 3, 4, 4, 4, 5, 5];
    return difficulties[levelId] || 1;
}

// Funciones auxiliares para niveles
function getDirectionVector(rotation) {
    switch (rotation) {
        case 0: return { dx: 0, dy: -1 }; // Norte
        case 90: return { dx: 1, dy: 0 }; // Este
        case 180: return { dx: 0, dy: 1 }; // Sur
        case 270: return { dx: -1, dy: 0 }; // Oeste
        default: return { dx: 0, dy: 0 };
    }
}

function rotateDirection(currentRotation, direction) {
    if (direction === 'cw') {
        return (currentRotation + 90) % 360;
    } else if (direction === 'ccw') {
        return (currentRotation - 90 + 360) % 360;
    }
    return currentRotation;
}

function getRotationSymbol(rotation) {
    switch (rotation) {
        case 0: return '⬆️'; // Norte
        case 90: return '➡️'; // Este
        case 180: return '⬇️'; // Sur
        case 270: return '⬅️'; // Oeste
        default: return '🚀';
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LEVELS, DIRECTIONS, getDirectionVector, rotateDirection, getRotationSymbol, getLevelDifficulty };
}
