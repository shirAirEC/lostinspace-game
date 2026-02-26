# 🚀 DESPLIEGUE EN VERCEL - Lost In Space

## 📋 Pasos para Desplegar

### Opción 1: Despliegue Rápido (Drag & Drop)

1. **Ir a Vercel**
   - Abre https://vercel.com
   - Inicia sesión (puedes usar GitHub, GitLab o email)

2. **Crear Nuevo Proyecto**
   - Clic en "Add New" → "Project"
   - Selecciona "Deploy without Git"

3. **Subir Carpeta**
   - Arrastra la carpeta `lostinspace-game` completa
   - O usa "Browse" para seleccionarla

4. **Configurar Proyecto**
   - **Project Name:** `lost-in-space-xml` (o el nombre que prefieras)
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** (dejar vacío)
   - **Output Directory:** (dejar vacío)

5. **Deploy**
   - Clic en "Deploy"
   - Espera 1-2 minutos
   - ¡Listo! Tendrás una URL como: `https://lost-in-space-xml.vercel.app`

---

### Opción 2: Con GitHub (Recomendado para actualizaciones)

```bash
# 1. Inicializar Git
cd lostinspace-game
git init
git add .
git commit -m "Initial commit: Lost In Space game"

# 2. Crear repositorio en GitHub
# Ve a github.com → New Repository → "lost-in-space-xml"

# 3. Subir a GitHub
git remote add origin https://github.com/TU_USUARIO/lost-in-space-xml.git
git branch -M main
git push -u origin main

# 4. Conectar con Vercel
# Ve a vercel.com → "Add New Project"
# → "Import Git Repository" 
# → Selecciona tu repo
# → Deploy
```

**Ventajas:**
- ✅ Actualizaciones automáticas al hacer `git push`
- ✅ Historial de versiones
- ✅ Rollback fácil si algo falla

---

### Opción 3: Vercel CLI

```bash
# Instalar Vercel CLI (solo una vez)
npm install -g vercel

# Navegar a la carpeta del juego
cd lostinspace-game

# Desplegar
vercel

# Seguir las instrucciones:
# - Login con tu cuenta
# - Confirmar nombre del proyecto
# - Aceptar configuración

# Para producción
vercel --prod
```

---

## 🔧 Verificación Post-Despliegue

Después de desplegar, verifica que todo funcione:

### ✅ Checklist:
- [ ] La página carga sin errores
- [ ] Se ve el campo de estrellas en el grid
- [ ] La nave aparece correctamente (SVG)
- [ ] Los assets SVG cargan (rocas, paredes, portal)
- [ ] El menú de niveles funciona
- [ ] El progreso se guarda (completa nivel 0, recarga, debe estar guardado)
- [ ] Los disparos muestran proyectil
- [ ] La nave rota visualmente
- [ ] La nave flota suavemente

### 🐛 Si algo falla:

**Assets no cargan:**
```
Solución: Verifica rutas en CSS
url('assets/ship.svg') → url('./assets/ship.svg')
```

**LocalStorage no funciona:**
- Es normal, localStorage funciona por dominio
- No afecta funcionalidad, solo resetea progreso en cada sesión

---

## 🌐 Dominio Personalizado (Opcional)

Si quieres un dominio más bonito:

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Añade dominio:
   - `lostinspace-xml.tu-dominio.com`
   - O compra uno en Vercel

---

## 📊 Estadísticas

Vercel te mostrará:
- 📈 Visitas al juego
- 🌍 Países de origen
- ⚡ Tiempos de carga
- 🔍 Errores si los hay

---

## 🔄 Actualizar el Juego

### Si usaste Drag & Drop:
- Ve a Vercel Dashboard
- Elimina el deployment anterior
- Sube la carpeta actualizada

### Si usaste GitHub:
```bash
# Hacer cambios en archivos
git add .
git commit -m "Actualización: [descripción]"
git push
# Vercel actualiza automáticamente en 1-2 minutos
```

### Si usaste Vercel CLI:
```bash
cd lostinspace-game
vercel --prod
```

---

## ✅ URL Final

Después del despliegue, obtendrás una URL como:
```
https://lost-in-space-xml.vercel.app
```

O si usaste dominio personalizado:
```
https://juego.tudominio.com
```

Esta URL es la que compartirás con tus estudiantes y la que añadirás a tus presentaciones.

---

## 📱 Funciona En:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Móvil (iPhone, Android)
- ✅ Cualquier dispositivo con navegador moderno

## 🚀 ¡Listo para Usar!

Una vez desplegado, puedes:
1. Compartir la URL con estudiantes
2. Añadirla a tus presentaciones
3. Usarla en clase
4. No requiere instalación
5. Funciona 24/7

---

**¡Tu juego educativo está listo para el mundo! 🌍🎮✨**
