-- Seed para tabla roles
-- Inserta roles básicos para pruebas

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', NOW(), NOW()),
(2, 'User', NOW(), NOW()),
(3, 'Sales', NOW(), NOW());

-- Si la columna id es AUTO_INCREMENT, puede omitirse el campo id en los INSERTS
