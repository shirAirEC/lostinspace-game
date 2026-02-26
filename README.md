# 🚀 Lost In Space - Juego Educativo de Programación XML

Un juego interactivo para aprender **XML**, **HTML**, **CSS** y **JavaScript** programando una nave espacial.

## 🎮 Descripción

Lost In Space es un juego educativo donde los estudiantes aprenden a programar escribiendo código XML para controlar una nave espacial. El juego combina:

- **Aprendizaje de XML**: Los comandos se escriben en formato XML válido
- **Programación visual**: Los estudiantes ven el resultado de su código en tiempo real
- **Progresión gradual**: 6 niveles con dificultad creciente
- **Feedback inmediato**: Errores de sintaxis y lógica explicados claramente

## 🎯 Objetivos Educativos

### Para el Curso de Lenguaje de Marcas (DAW)

1. **XML Básico**
   - Estructura de elementos (`<elemento>`)
   - Atributos (`attribute="value"`)
   - Elementos auto-cerrados (`<elemento/>`)
   - Anidación correcta
   - Comentarios XML

2. **HTML5 & CSS3**
   - Estructura semántica del HTML
   - Grid y Flexbox
   - Animaciones CSS
   - Variables CSS
   - Responsive design

3. **JavaScript**
   - DOM manipulation
   - Parsing XML con DOMParser
   - Programación asíncrona (async/await)
   - Clases y objetos
   - Event handling

## 🕹️ Cómo Jugar

### Comandos Disponibles

Escribe código XML en el editor usando estos comandos dentro de `<actions>`:

```xml
<actions>
    <!-- Mover hacia adelante -->
    <move distance="3"/>
    
    <!-- Girar a la derecha (clockwise) -->
    <rotate direction="cw"/>
    
    <!-- Girar a la izquierda (counter-clockwise) -->
    <rotate direction="ccw"/>
    
    <!-- Disparar para destruir rocas -->
    <shoot/>
    
    <!-- Modo fantasma (atravesar paredes) -->
    <ghost time="2"/>
</actions>
```

### Ejemplo Completo

```xml
<actions>
    <!-- Navegar hasta la salida -->
    <move distance="3"/>
    <rotate direction="cw"/>
    <move distance="2"/>
    <shoot/>
    <move distance="1"/>
</actions>
```

## 📚 Niveles

1. **Tutorial**: Primeros movimientos básicos
2. **Aprendiendo a Girar**: Introducción a rotaciones
3. **Obstáculos Espaciales**: Navegación con rocas
4. **Introducción al Disparo**: Destruir obstáculos
5. **Navegación Compleja**: Combinar todas las habilidades
6. **Laberinto Final**: Desafío maestro

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone [url-del-repo]

# Navegar a la carpeta del juego
cd lostinspace-game

# Abrir con un servidor local (cualquier opción)
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx serve

# Opción 3: VS Code Live Server
# Clic derecho en index.html > Open with Live Server
```

Abre `http://localhost:8000` en tu navegador.

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube el contenido de `lostinspace-game/` a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Clic en "New Project"
4. Importa tu repositorio
5. Configura:
   - Framework Preset: **Other**
   - Root Directory: `./`
6. Clic en "Deploy"

### Opción 2: Desde Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
cd lostinspace-game
vercel

# Para producción
vercel --prod
```

## 🎨 Características

- ✅ **Editor de código con números de línea**
- ✅ **Validación de XML en tiempo real**
- ✅ **Consola con feedback detallado**
- ✅ **Animaciones suaves**
- ✅ **6 niveles progresivos**
- ✅ **Sistema de pistas**
- ✅ **Diseño responsive**
- ✅ **Modo oscuro**
- ✅ **Atajos de teclado** (Ctrl+Enter para ejecutar)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Grid, Flexbox, animaciones, variables CSS
- **JavaScript ES6+**: Clases, async/await, módulos
- **DOM API**: Manipulación del DOM
- **DOMParser**: Parsing de XML
- **No frameworks**: Vanilla JavaScript puro

## 📖 Uso en el Aula

### Sugerencias Didácticas

1. **Sesión 1**: Introducción al XML y comandos básicos (niveles 1-2)
2. **Sesión 2**: Comandos avanzados y debugging (niveles 3-4)
3. **Sesión 3**: Optimización y desafíos (niveles 5-6)
4. **Sesión 4**: Análisis del código fuente del juego

### Ejercicios Adicionales

- Modificar los niveles existentes
- Crear nuevos niveles en `levels.js`
- Añadir nuevos comandos XML
- Implementar un sistema de puntuación
- Añadir multiplicador

## 🔧 Personalización

### Añadir Nuevos Niveles

Edita `levels.js`:

```javascript
{
    id: 6,
    name: "Mi Nivel",
    width: 10,
    height: 10,
    mission: "Descripción del objetivo",
    walls: [{ x: 0, y: 0, width: 5, height: 1 }],
    rocks: [{ x: 5, y: 5, size: 1, type: "white" }],
    exit: { x: 9, y: 9 },
    player: { x: 0, y: 0, rotation: 0, name: "captain" },
    enemies: [],
    startCode: `<actions>\n</actions>`
}
```

### Modificar Velocidad de Animación

En `engine.js`, cambia:

```javascript
this.animationSpeed = 500; // milisegundos
```

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary: #4f46e5;
    --success: #10b981;
    /* ... más colores */
}
```

## 🐛 Debugging

### Consola del Navegador

Abre las DevTools (F12) para ver logs detallados:

```javascript
// Acceder al estado del juego
console.log(window.game.engine.getState());

// Ver el nivel actual
console.log(LEVELS[window.game.currentLevelIndex]);
```

## 📝 Licencia

Este proyecto es educativo y de código abierto. Basado en el concepto original de "Lost In Space" por e-UCM.

## 👥 Créditos

- **Concepto Original**: e-UCM (Universidad Complutense de Madrid)
- **Implementación HTML5**: Versión educativa para DAW
- **Diseño**: UI/UX moderno para estudiantes

## 🤝 Contribuir

¿Ideas para mejorar el juego? ¡Contribuciones bienvenidas!

1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Haz push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si encuentras bugs o tienes sugerencias:
- Abre un issue en GitHub
- Contacta al profesor del curso

---

**¡Diviértete aprendiendo XML! 🚀**
