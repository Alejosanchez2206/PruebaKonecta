
-- Script maestro para ejecutar todos los seeds en orden
-- Uso: ejecutar desde la carpeta Backend/sql con el cliente mysql, por ejemplo:
--   mysql -u <usuario> -p <nombre_base_de_datos> < seed_all.sql

-- Deshabilitar temporalmente comprobaciones de FK para evitar problemas en orden
SET FOREIGN_KEY_CHECKS = 0;

-- Roles
SOURCE seed_roles.sql;

-- Companies
SOURCE seed_companies.sql;

-- Users
SOURCE seed_users.sql;

-- Ventas
SOURCE seed_ventas.sql;

SET FOREIGN_KEY_CHECKS = 1;

