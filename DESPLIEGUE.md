# 🚀 Guía Rápida de Despliegue en Vercel

## ✅ El Juego Está Listo

Has creado con éxito **Lost In Space**, un juego educativo HTML5 completamente funcional para aprender XML.

## 📂 Estructura de Archivos

```
lostinspace-game/
├── index.html          # Página principal
├── styles.css          # Estilos del juego
├── game.js            # Controlador principal
├── engine.js          # Motor del juego
├── levels.js          # Definición de niveles
├── vercel.json        # Configuración de Vercel
├── README.md          # Documentación completa
└── .gitignore         # Archivos a ignorar
```

## 🌐 Desplegar en Vercel (3 opciones)

### Opción 1: Despliegue Directo (MÁS RÁPIDO)

1. Ve a https://vercel.com
2. Regístrate/Inicia sesión (puedes usar GitHub)
3. Clic en **"Add New Project"**
4. Arrastra la carpeta `lostinspace-game` a la ventana
5. ¡Listo! Vercel te dará una URL

### Opción 2: Desde GitHub (RECOMENDADO)

```bash
# 1. Inicializar repositorio Git
cd lostinspace-game
git init
git add .
git commit -m "Initial commit: Lost In Space game"

# 2. Crear repositorio en GitHub (desde la web)
# Ve a github.com > New Repository > "lostinspace-game"

# 3. Subir código
git remote add origin https://github.com/TU_USUARIO/lostinspace-game.git
git branch -M main
git push -u origin main

# 4. Conectar con Vercel
# Ve a vercel.com > Import Project > Selecciona tu repo
# ¡Deploy automático!
```

### Opción 3: Vercel CLI

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Navegar a la carpeta
cd lostinspace-game

# 3. Desplegar
vercel

# Sigue las instrucciones:
# - Login con GitHub/GitLab/Bitbucket
# - Confirma el nombre del proyecto
# - Confirma configuración

# 4. Para producción
vercel --prod
```

## 🧪 Probar Localmente Primero

Antes de desplegar, prueba el juego localmente:

### Opción A: Python (Si tienes Python instalado)

```bash
cd lostinspace-game
python -m http.server 8000
```

Abre: http://localhost:8000

### Opción B: Node.js

```bash
cd lostinspace-game
npx serve
```

### Opción C: VS Code

1. Instala la extensión "Live Server"
2. Clic derecho en `index.html`
3. "Open with Live Server"

## 🎮 Verificar que Funciona

El juego debe:
- ✅ Mostrar un grid espacial
- ✅ Tener un editor de código XML
- ✅ Permitir escribir y ejecutar código
- ✅ Mostrar la nave moviéndose
- ✅ Detectar victoria al llegar a la salida

## 🐛 Solución de Problemas

### Error: "Failed to load levels.js"
- Verifica que todos los archivos estén en la misma carpeta
- No abras index.html directamente (usa servidor local)

### El grid no se ve
- Abre la consola del navegador (F12)
- Busca errores en rojo
- Verifica que todos los archivos .js se carguen

### Los comandos XML no funcionan
- Verifica la sintaxis XML en el editor
- Mira la consola del juego para errores
- Ejemplo válido:
  ```xml
  <actions>
      <move distance="3"/>
  </actions>
  ```

## 📱 Configuración Vercel (Opcional)

Si quieres personalizar el dominio:

1. Ve a tu proyecto en Vercel
2. Settings > Domains
3. Añade un dominio personalizado
4. Sigue las instrucciones DNS

## 🎓 Uso en Clase

### Compartir con Estudiantes

Una vez desplegado en Vercel, obtendrás una URL como:
```
https://lostinspace-game.vercel.app
```

Comparte esta URL con tus estudiantes. No necesitan instalar nada.

### Ventajas para el Aula

- ✅ Sin instalación requerida
- ✅ Funciona en cualquier dispositivo
- ✅ Siempre disponible 24/7
- ✅ Actualizaciones automáticas (si usas GitHub)
- ✅ Gratis en Vercel

## 📊 Estadísticas de Vercel (Opcional)

Vercel te muestra:
- Número de visitas
- Países de origen
- Tiempos de carga
- Errores (si los hay)

## 🔄 Actualizar el Juego

### Si usaste GitHub:
```bash
# Hacer cambios en los archivos
git add .
git commit -m "Descripción de cambios"
git push
# Vercel actualiza automáticamente
```

### Si usaste drag & drop:
- Vuelve a arrastrar la carpeta actualizada
- O usa Vercel CLI: `vercel --prod`

## 🎉 ¡Listo!

Tu juego educativo está listo para usar. Los estudiantes pueden:

1. Abrir la URL
2. Leer las instrucciones
3. Escribir código XML
4. Ver resultados en tiempo real
5. Aprender jugando

## 💡 Próximos Pasos

- [ ] Comparte la URL con estudiantes
- [ ] Crea ejercicios adicionales
- [ ] Personaliza los niveles en `levels.js`
- [ ] Añade más comandos XML si quieres
- [ ] Recopila feedback de estudiantes

---

**¿Problemas?** Revisa:
- Consola del navegador (F12)
- README.md para documentación completa
- Vercel dashboard para logs de despliegue
