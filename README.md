# Prueba Koneta

Repositorio con la prueba técnica para Koneta. Contiene una API backend en Node/Express + Sequelize (MySQL) y un frontend en React (Vite).

Estructura principal

- `Backend/` - Código del servidor (Node.js, Express, Sequelize)
- `Frotend/` - Aplicación cliente (React + Vite)

Resumen rápido

- Backend: arranque con `npm start` (usa `nodemon`) y escucha por defecto en el puerto `3001`.
- Frontend: arranque con `npm run dev` (Vite) y por defecto corre en `http://localhost:5173`.

Lectura rápida de comandos

- Iniciar backend:

  - Ir a `Backend/` y ejecutar `npm install` y luego `npm start`.

- Iniciar frontend:

  - Ir a `Frotend/` y ejecutar `npm install` y luego `npm run dev`.

Archivos importantes

- `Backend/src/index.js` - punto de entrada del servidor.
- `Backend/src/config/database.js` - configuración de Sequelize (variables de entorno para conexión MySQL).
- `Backend/src/routers/` - define rutas expuestas por la API (`/users`, `/rol`, `/company`).
- `Frotend/src/main.jsx` - arranca la app React.

Más detalles y pasos de configuración específicos por carpeta dentro de sus respectivos READMEs (`Backend/README.md`, `Frotend/README.md`).

---

