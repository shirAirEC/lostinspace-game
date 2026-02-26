// Definición de niveles basados en los XML originales del juego
const LEVELS = [
    {
        id: 0,
        name: "Tutorial - Primeros Pasos",
        width: 11,
        height: 9,
        mission: "Mueve tu nave hasta la salida verde. Usa el comando <move distance='N'/> para moverte hacia adelante.",
        walls: [],
        rocks: [],
        exit: { x: 8, y: 4 },
        player: { x: 2, y: 4, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <move distance="6"/>
</actions>`,
        hints: [
            "La nave se mueve en la dirección hacia donde está mirando",
            "El atributo 'distance' indica cuántas casillas avanzar",
            "Tu nave está mirando hacia la derecha (→)"
        ]
    },
    {
        id: 1,
        name: "Aprendiendo a Girar",
        width: 11,
        height: 9,
        mission: "Alcanza la salida. Necesitarás moverte y girar. Usa <rotate direction='cw'/> para girar a la derecha.",
        walls: [
            { x: 0, y: 0, width: 2, height: 9 },
            { x: 9, y: 0, width: 2, height: 9 },
            { x: 3, y: 0, width: 7, height: 3 },
            { x: 1, y: 4, width: 10, height: 9 }
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
    {
        id: 2,
        name: "Obstáculos Espaciales",
        width: 11,
        height: 10,
        mission: "Evita las rocas y alcanza la salida. Planifica tu ruta cuidadosamente.",
        walls: [
            { x: 0, y: 0, width: 6, height: 3 },
            { x: 5, y: 5, width: 6, height: 5 }
        ],
        rocks: [
            { x: 2, y: 8, size: 1, type: "black" },
            { x: 3, y: 5, size: 2, type: "black" },
            { x: 6, y: 2, size: 2, type: "white" },
            { x: 5, y: 3, size: 1, type: "white" }
        ],
        exit: { x: 9, y: 1 },
        player: { x: 3, y: 8, rotation: 270, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Escribe tu código aquí -->
</actions>`,
        hints: [
            "Las rocas blancas son destructibles",
            "Las rocas negras son más resistentes",
            "Planifica una ruta que evite obstáculos"
        ]
    },
    {
        id: 3,
        name: "Introducción al Disparo",
        width: 11,
        height: 9,
        mission: "Aprende a usar <shoot/> para destruir rocas blancas que bloquean tu camino.",
        walls: [
            { x: 0, y: 5, width: 11, height: 4 },
            { x: 0, y: 0, width: 5, height: 4 },
            { x: 6, y: 0, width: 5, height: 4 }
        ],
        rocks: [
            { x: 5, y: 4, size: 1, type: "white", health: 1 }
        ],
        exit: { x: 10, y: 4 },
        player: { x: 0, y: 4, rotation: 0, name: "captain" },
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
    {
        id: 4,
        name: "Navegación Compleja",
        width: 11,
        height: 9,
        mission: "Combina movimiento, rotación y disparos para alcanzar la salida en este nivel complejo.",
        walls: [
            { x: 8, y: 0, width: 3, height: 2 },
            { x: 10, y: 1, width: 2, height: 7 },
            { x: 8, y: 7, width: 3, height: 3 }
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
        player: { x: 0, y: 4, rotation: 0, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- ¡Desafío avanzado! -->
</actions>`,
        hints: [
            "Analiza el patrón de rocas negras y blancas",
            "Solo las rocas blancas pueden ser destruidas",
            "La salida está en la columna de rocas"
        ]
    },
    {
        id: 5,
        name: "Laberinto Final",
        width: 13,
        height: 11,
        mission: "¡Nivel maestro! Usa todas tus habilidades para navegar este complejo laberinto espacial.",
        walls: [
            { x: 0, y: 0, width: 2, height: 11 },
            { x: 11, y: 0, width: 2, height: 11 },
            { x: 2, y: 0, width: 3, height: 4 },
            { x: 8, y: 0, width: 3, height: 4 },
            { x: 2, y: 7, width: 3, height: 4 },
            { x: 8, y: 7, width: 3, height: 4 },
            { x: 5, y: 4, width: 3, height: 3 }
        ],
        rocks: [
            { x: 3, y: 5, size: 1, type: "white", health: 1 },
            { x: 9, y: 5, size: 1, type: "white", health: 1 },
            { x: 6, y: 2, size: 1, type: "black" },
            { x: 6, y: 8, size: 1, type: "black" }
        ],
        exit: { x: 6, y: 5 },
        player: { x: 2, y: 5, rotation: 0, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- ¡Mucha suerte! -->
</actions>`,
        hints: [
            "Este es el nivel final - usa todo lo que has aprendido",
            "Hay múltiples caminos posibles",
            "Piensa en la secuencia más eficiente"
        ]
    },
    {
        id: 6,
        name: "Laberinto de Paredes",
        width: 13,
        height: 10,
        mission: "Navega por este laberinto de paredes. Deberás combinar movimientos y rotaciones con precisión.",
        walls: [
            { x: 0, y: 0, width: 5, height: 3 },
            { x: 4, y: 0, width: 9, height: 3 },
            { x: 6, y: 2, width: 7, height: 8 },
            { x: 0, y: 0, width: 5, height: 9 }
        ],
        rocks: [],
        exit: { x: 5, y: 8 },
        player: { x: 5, y: 3, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Nivel avanzado de navegación -->
</actions>`,
        hints: [
            "Observa el patrón de paredes cuidadosamente",
            "Necesitarás múltiples rotaciones",
            "Planifica la ruta completa antes de ejecutar"
        ]
    },
    {
        id: 7,
        name: "Campo de Asteroides",
        width: 13,
        height: 10,
        mission: "Atraviesa este campo de asteroides. Algunas rocas pueden ser destruidas, otras debes evitarlas.",
        walls: [
            { x: 0, y: 0, width: 6, height: 3 },
            { x: 5, y: 5, width: 6, height: 5 }
        ],
        rocks: [
            { x: 2, y: 8, size: 1, type: "black" },
            { x: 3, y: 5, size: 1, type: "black" },
            { x: 6, y: 2, size: 1, type: "white", health: 1 },
            { x: 5, y: 3, size: 1, type: "white", health: 1 },
            { x: 7, y: 4, size: 1, type: "white", health: 1 },
            { x: 8, y: 6, size: 1, type: "black" }
        ],
        exit: { x: 9, y: 1 },
        player: { x: 3, y: 8, rotation: 270, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Combina movimiento, rotación y disparo -->
</actions>`,
        hints: [
            "Las rocas blancas se destruyen con un disparo",
            "Las rocas negras son indestructibles",
            "Planifica qué rocas disparar y cuáles evitar"
        ]
    },
    {
        id: 8,
        name: "El Corredor Estrecho",
        width: 13,
        height: 9,
        mission: "Navega por este corredor estrecho disparando obstáculos en tu camino.",
        walls: [
            { x: 0, y: 5, width: 11, height: 4 },
            { x: 0, y: 0, width: 5, height: 4 },
            { x: 6, y: 0, width: 7, height: 4 }
        ],
        rocks: [
            { x: 5, y: 4, size: 1, type: "white", health: 1 },
            { x: 7, y: 4, size: 1, type: "white", health: 1 }
        ],
        exit: { x: 10, y: 4 },
        player: { x: 0, y: 4, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Dispara y avanza -->
</actions>`,
        hints: [
            "El corredor es estrecho - solo puedes avanzar por el medio",
            "Dispara las rocas blancas para abrir camino",
            "No puedes atravesar las rocas negras"
        ]
    },
    {
        id: 9,
        name: "Patrón en L",
        width: 12,
        height: 10,
        mission: "Sigue un patrón en forma de L para alcanzar la salida. Practica tus rotaciones.",
        walls: [
            { x: 0, y: 0, width: 2, height: 10 },
            { x: 10, y: 0, width: 2, height: 10 },
            { x: 2, y: 0, width: 8, height: 2 },
            { x: 2, y: 8, width: 8, height: 2 },
            { x: 5, y: 2, width: 2, height: 6 }
        ],
        rocks: [
            { x: 3, y: 5, size: 1, type: "white", health: 1 },
            { x: 8, y: 5, size: 1, type: "white", health: 1 }
        ],
        exit: { x: 8, y: 3 },
        player: { x: 3, y: 3, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- Forma de L: derecha, abajo, derecha -->
</actions>`,
        hints: [
            "Piensa en forma de L",
            "Necesitarás al menos 2 rotaciones",
            "La ruta óptima tiene 3 segmentos"
        ]
    },
    {
        id: 10,
        name: "Desafío de Precisión",
        width: 14,
        height: 10,
        mission: "Nivel avanzado que requiere precisión absoluta en cada movimiento y disparo.",
        walls: [
            { x: 0, y: 0, width: 14, height: 2 },
            { x: 0, y: 8, width: 14, height: 2 },
            { x: 0, y: 0, width: 2, height: 10 },
            { x: 12, y: 0, width: 2, height: 10 },
            { x: 5, y: 3, width: 4, height: 4 }
        ],
        rocks: [
            { x: 3, y: 4, size: 1, type: "white", health: 1 },
            { x: 3, y: 5, size: 1, type: "black" },
            { x: 10, y: 4, size: 1, type: "white", health: 1 },
            { x: 10, y: 5, size: 1, type: "black" },
            { x: 7, y: 2, size: 1, type: "white", health: 1 },
            { x: 7, y: 7, size: 1, type: "white", health: 1 }
        ],
        exit: { x: 11, y: 5 },
        player: { x: 2, y: 5, rotation: 90, name: "captain" },
        enemies: [],
        startCode: `<actions>
    <!-- ¡Desafío máximo! -->
</actions>`,
        hints: [
            "Este nivel requiere una secuencia perfecta",
            "Hay múltiples rutas posibles",
            "Combina todas las habilidades aprendidas",
            "No hay margen de error - planifica bien"
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
    module.exports = { LEVELS, DIRECTIONS, getDirectionVector, rotateDirection, getRotationSymbol };
}
