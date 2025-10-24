-- Seed para tabla ventas
-- Inserta ventas de ejemplo. Asegúrate de que los user ids y company ids existan antes de ejecutar.

INSERT INTO `ventas` (`id`, `producto`, `cupo_solicitado`, `franquicia`, `fecha_creacion`, `usuario_crea`, `fecha_actualizacion`, `usuario_actualiza`, `tasa`, `company_id`) VALUES
(1, 'Credito de Consumo', '5000000', 'VISA', NOW(), 3, NOW(), 3, 12.50, 1),
(2, 'Tarjeta de Credito', '2000000', 'MASTERCARD', NOW(), 3, NOW(), 3, 0.00, 2),
(3, 'Libranza Libre Inversión', '10000000', NULL, NOW(), 2, NOW(), 2, 9.75, 1);
