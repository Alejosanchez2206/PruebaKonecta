# Backend - Prueba Koneta

API REST construida con Node.js, Express y Sequelize (MySQL).

Requisitos

- Node.js >= 14
- MySQL (base de datos)

# Backend - Prueba Koneta

API REST construida con Node.js, Express y Sequelize (MySQL).

Requisitos

- Node.js >= 14
- MySQL (base de datos)

Instalación

1. Copiar el repositorio y ubicarse en la carpeta Backend:

   cd Backend

2. Instalar dependencias:

   npm install

3. Crear un archivo `.env` en la raíz de `Backend/` con las siguientes variables (ejemplo):

DB_HOST=localhost
DB_PORT=3306
DB_NAME=nombre_db
DB_USER=usuario
DB_PASSWORD=password
PORT=3001
JWT_SECRET=tu_secreto_jwt

4. Iniciar el servidor (usa nodemon):

npm start

Por defecto el servidor escuchará en `http://localhost:3001`.

Conexión a la base de datos

La conexión está definida en `src/config/database.js` y utiliza variables de entorno (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`).

Rutas principales

Las rutas se montan automáticamente desde `src/routers`. Los endpoints principales disponibles son:

- /users
  - POST /users/register  (requiere token) - Registrar un nuevo usuario (body: user object)
  - POST /users/login - Login (body: { email, password })
  - GET /users/company/:companyId (requiere token) - Obtener usuarios por compañía
  - GET /users/:id (requiere token) - Obtener usuario por id
  - PUT /users/update/:id (requiere token) - Actualizar usuario
  - DELETE /users/delete/:id (requiere token) - Eliminar usuario

- /rol
  - POST /rol - Crear rol (body: { name, description })
  - GET /rol (requiere token) - Listar roles

- /company
  - POST /company - Crear compañía (body: company data)
  - GET /company/:id (requiere token) - Obtener compañía por id

Autenticación

- El middleware `src/middleware/verifyToken.js` protege rutas que requieren autorización. Debes incluir en las peticiones autorizadas el header `Authorization: Bearer <token>` o usar cookies según la implementación.

Ejemplos de petición

- Login

  POST http://localhost:3001/users/login
  Body JSON:

  {
    "email": "usuario@example.com",
    "password": "contraseña"
  }

Respuesta esperada (ejemplo):

{
  "token": "<jwt>",
  "user": { ... }
}

Ejemplo: crear usuario (si la ruta requiere token, incluir encabezado Authorization)

POST http://localhost:3001/users/register

Body JSON ejemplo:

{
  "name": "Nombre",
  "email": "usuario@example.com",
  "password": "contraseña",
  "companyId": 1,
  "roleId": 2
}

Probar con curl (login):

curl -X POST http://localhost:3001/users/login -H "Content-Type: application/json" -d "{\"email\":\"usuario@example.com\",\"password\":\"contraseña\"}"

Notas de desarrollo

- Los servicios están en `src/services/` y contienen la lógica con Sequelize.
- El router principal (`src/routers/index.js`) incluye un `logMiddleware` que registra las peticiones.

Problemas comunes

- Error de conexión a MySQL: verificar variables en `.env` y que el servidor MySQL esté corriendo.
- Variables de entorno: asegúrate que `JWT_SECRET` esté configurado para las rutas protegidas.
