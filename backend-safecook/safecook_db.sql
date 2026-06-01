CREATE DATABASE IF NOT EXISTS safecook_db;
USE safecook_db;

-- 1. Tabla Usuarios (Login y Admin)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, password) VALUES
('Pedro Compean', 'pedro@safecook.com', '$2a$10$wT.xxxxxxxxxxxxxxxxxxxx'), 
('Lino Compean', 'lino@safecook.com', '$2a$10$wT.xxxxxxxxxxxxxxxxxxxx'),
('Luis Pablo Oviedo', 'luis@safecook.com', '$2a$10$wT.xxxxxxxxxxxxxxxxxxxx'),
('Saul Cruz', 'profesaul@tecnologico.edu.mx', '$2a$10$wT.xxxxxxxxxxxxxxxxxxxx'),
('Admin Central', 'admin@safecook.com', '$2a$10$wT.xxxxxxxxxxxxxxxxxxxx');

-- 2. Tabla Bitacora Historica
CREATE TABLE IF NOT EXISTS bitacora_historica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_deteccion TIME NOT NULL,
    nivel_fuga_ppm VARCHAR(50) NOT NULL,
    accion_hardware VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO bitacora_historica (hora_deteccion, nivel_fuga_ppm, accion_hardware, estado) VALUES
('08:25:36', '899 ppm', 'Valvula cerrada, estractor ON', 'Alerta Enviada'),
('15:48:16', '756 ppm', 'Valvula cerrada, estractor ON', 'Alerta Enviada'),
('11:56:24', '914 ppm', 'Valvula cerrada, estractor ON', 'Alerta Enviada'),
('19:30:00', '120 ppm', 'Ninguna', 'Monitoreo Normal'),
('22:15:45', '650 ppm', 'Valvula cerrada', 'Alerta Enviada');

-- 3. Tabla Soporte y Feedback
CREATE TABLE IF NOT EXISTS soporte_feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_operador VARCHAR(100) NOT NULL,
    tipo_reporte VARCHAR(50) NOT NULL,
    experiencia TEXT NOT NULL,
    calificacion INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO soporte_feedback (nombre_operador, tipo_reporte, experiencia, calificacion) VALUES
('Juan Perez', 'Sugerencia', 'Me gustaria que la alerta llegara también por SMS.', 9),
('Maria Gomez', 'Queja', 'La grafica tardo mucho en cargar.', 6),
('Carlos Lopez', 'Problema Tecnico', 'El sensor marca niveles altos cuando no hay gas.', 4),
('Ana Torres', 'Felicitacion', 'Excelente interfaz, muy intuitiva y segura.', 10),
('Luis Martinez', 'Queja', 'No puedo actualizar mi foto de perfil.', 5);

-- 4. Tabla Deteccion de Gas
CREATE TABLE IF NOT EXISTS deteccion_gas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nivel_gas_ppm INT NOT NULL,
    estado_valvula VARCHAR(20) NOT NULL,
    estado_extractor VARCHAR(20) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO deteccion_gas (nivel_gas_ppm, estado_valvula, estado_extractor) VALUES
(100, 'ABIERTA', 'APAGADO'),
(450, 'CERRADA', 'ENCENDIDO'),
(120, 'ABIERTA', 'APAGADO'),
(800, 'CERRADA', 'ENCENDIDO'),
(90, 'ABIERTA', 'APAGADO');

-- 5. Tabla Analitica Predictiva
CREATE TABLE IF NOT EXISTS analitica_predictiva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado_mq2_porcentaje INT NOT NULL,
    electrovalvula_porcentaje INT NOT NULL,
    salud_actuador_porcentaje INT NOT NULL,
    indice_riesgo VARCHAR(50) NOT NULL,
    fecha_analisis TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO analitica_predictiva (estado_mq2_porcentaje, electrovalvula_porcentaje, salud_actuador_porcentaje, indice_riesgo) VALUES
(10, 85, 100, 'Bajo'),
(5, 40, 60, 'Medio'),
(90, 15, 20, 'Critico'),
(12, 90, 95, 'Bajo'),
(85, 30, 45, 'Alto');