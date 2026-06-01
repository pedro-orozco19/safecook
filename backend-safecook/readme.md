# SafeCook PRO - Backend API

Backend del sistema IoT **SafeCook PRO** para el monitoreo y prevención de fugas de gas. Desarrollado con Node.js, Express y MySQL.

## Equipo de Desarrollo
* Pedro Compeán Orozco (22224008)
* Luis Pablo Oviedo Castro (22224023)

## Módulos del Sistema (5 CRUDs)
El sistema gestiona las siguientes entidades reales:
1. **Usuarios:** Panel de administración de cuentas y accesos.
2. **Detección de Gas:** Monitoreo en tiempo real de niveles (PPM), estado de válvulas y extractores.
3. **Analítica Predictiva:** IA para determinar riesgo, salud del actuador y vida útil del MQ-2.
4. **Bitácora Histórica:** Registro detallado de fugas críticas y acciones automatizadas de hardware.
5. **Soporte y Feedback:** Encuestas de satisfacción, registro de quejas y reportes de clientes.

## Instrucciones de Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar las dependencias necesarias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno. Crear un archivo `.env` en la raíz con la siguiente estructura:
   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=safecook_db
   PORT=3000
   JWT_SECRET=tu_clave_secreta_aqui_12345
   JWT_EXPIRES=1h
   ```
4. Importar el script SQL en MySQL para crear la base de datos, las 5 tablas y los registros de prueba.
5. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Endpoints Principales

### Autenticación e Inicio
* `POST /api/auth/registro` - Registrar un usuario nuevo.
* `POST /api/auth/login` - Iniciar sesión (Devuelve el token JWT).
* `GET /api/inicio` - (Ruta protegida) Dashboard inicial con datos dinámicos de MySQL.

### Módulos CRUD 
*(Nota: Las operaciones POST, PUT y DELETE requieren el token JWT en el header de Authorization)*

* **Usuarios:** `/api/usuarios` 
  * Endpoint Extra: `GET /api/usuarios/corporativos`
* **Detección de Gas:** `/api/deteccion` 
  * Endpoint Extra: `GET /api/deteccion/peligro`
* **Analítica Predictiva:** `/api/analitica` 
  * Endpoint Extra: `GET /api/analitica/urgentes`
* **Bitácora Histórica:** `/api/bitacora` 
  * Endpoint Extra: `GET /api/bitacora/alertas`
* **Soporte y Feedback:** `/api/soporte` 
  * Endpoint Extra: `GET /api/soporte/quejas`