
# 🧩 Konetta — Inicialización de Base de Datos con SQL Seeds

Este directorio contiene los scripts SQL necesarios para **crear la estructura base** y **poblar la base de datos de prueba** del proyecto **Konetta**. Su objetivo es simplificar la configuración del entorno de desarrollo y proporcionar datos de ejemplo para pruebas funcionales.

---

## 📁 Estructura del directorio

| Archivo             | Descripción                                                                 |
|---------------------|------------------------------------------------------------------------------|
| `schema.sql`        | Define las tablas principales: `roles`, `company`, `users`, `ventas`.       |
| `seed_roles.sql`    | Inserta los roles base del sistema: `Admin`, `User`, `Sales`.               |
| `seed_companies.sql`| Agrega empresas de ejemplo.                                                  |
| `seed_users.sql`    | Crea usuarios de prueba asociados a roles y compañías.                      |
| `seed_ventas.sql`   | Registra ventas simuladas para pruebas.                                     |
| `seed_all.sql`      | Ejecuta todos los scripts anteriores en orden mediante comandos `SOURCE`.   |

---

## ⚙️ Requisitos previos

Antes de ejecutar los scripts, asegúrate de cumplir con los siguientes pasos:

1. Tener una base de datos **MySQL 8 o superior** creada (por ejemplo, `konetta`).
2. Configurar correctamente el archivo `.env` en el backend del proyecto:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=konetta
   DB_USER=root
   DB_PASSWORD=your_secure_password
   ```

---

## 🚀 Ejecución de scripts

Ubícate en el directorio `Backend/sql` y ejecuta los scripts desde PowerShell o el cliente de MySQL:

```powershell
# Ejecutar todos los scripts en un solo paso:
mysql -u <DB_USER> -p <DB_NAME> < seed_all.sql

# O ejecutar cada script manualmente desde el cliente MySQL:
# mysql> SOURCE schema.sql;
# mysql> SOURCE seed_roles.sql;
# mysql> SOURCE seed_companies.sql;
# mysql> SOURCE seed_users.sql;
# mysql> SOURCE seed_ventas.sql;
```

---

## 📝 Notas importantes

- Las contraseñas en `seed_users.sql` son valores de ejemplo (`12345`). en formato bcrypt, 
- Verifica que las tablas definidas coincidan con los nombres utilizados en los modelos del backend (`company`, `roles`, `users`, `ventas`).
- Puedes modificar los datos de ejemplo según las necesidades específicas de tu entorno de desarrollo.


