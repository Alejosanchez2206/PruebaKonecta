
# Frotend - Prueba Koneta

Aplicación cliente construida con React y Vite.

Requisitos

- Node.js >= 14

Instalación y ejecución

1. Ir a la carpeta del frontend:

   cd Frotend

2. Instalar dependencias:

   npm install

3. Ejecutar en modo desarrollo:

   npm run dev

La aplicación se sirve por defecto en `http://localhost:5173`.

Scripts disponibles

- `npm run dev` - Arranca Vite en modo desarrollo.
- `npm run build` - Genera la build de producción.
- `npm run preview` - Sirve la build para previsualización.
- `npm run lint` - Ejecuta ESLint sobre el proyecto.

Configuración y conexión con Backend

- El backend por defecto se espera en `http://localhost:3001` (ver `Backend/`).
- Los servicios que llaman al backend están en `src/service/rol.js` y `src/service/user.js`. Busca una constante `BASE_URL` o similar dentro de esos archivos y ajústala si tu backend corre en otra URL o puerto.

Ejemplo: cambiar la base URL (ejemplo conceptual)

```
// Frotend/src/service/user.js
const BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';
```

Considera usar variables de entorno de Vite (archivos `.env`) para configurar `VITE_API_URL` en desarrollo o producción.

Estructura importante

- `src/component` - Componentes compartidos (header, layout, modal)
- `src/context/AuthContext.jsx` - Contexto para autenticación
- `src/pages` - Páginas de la app (login, usuarios, ventas...)

Notas de desarrollo

- Vite está configurado en `vite.config.js`.
- El proyecto incluye ESLint; ejecuta `npm run lint` para chequear estilo.

