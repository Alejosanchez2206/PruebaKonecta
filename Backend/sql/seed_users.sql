-- Seed para tabla users
-- Inserta usuarios de ejemplo. Las contraseñas están como ejemplos (hashes simulados).
-- Reemplaza por hashes reales (bcrypt) si tu app los valida al autenticar.

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `address`, `password`, `rol_id`, `company_id`, `created_at`, `updated_at`) VALUES
(1, 'Alice Admin', 'alice@acme.com', '3101112222', 'Calle A 1', '$2a$10$aWfWWgHowhUdEm3Y0/h1N.FOVkgJ0/sWZiq9GMtYMaW6AIyWgSnyC', 1, 1, NOW(), NOW()),
(2, 'Bob User', 'bob@globex.com', '3103334444', 'Calle B 2', '$2a$10$Ik.1f3ohUvATj7qvV8i63uUG.bY50BHQ6K5yKrsBtyQgmvakLOR3C', 2, 2, NOW(), NOW()),
(3, 'Carlos Sales', 'carlos@sales.com', '3105556666', 'Calle C 3', '$2a$10$/iTSovFsmKNpV21tvrBY2e.3SSOekj1C8pGSlQ8Fu9effpSvtjfni', 3, 1, NOW(), NOW());

-- Nota: si quieres generar hashes bcrypt desde Node.js:
-- const bcrypt = require('bcrypt'); const hash = await bcrypt.hash('tuPassword', 10);
