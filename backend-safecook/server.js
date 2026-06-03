const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express(); 

// Middlewares
app.use(cors());           
app.use(express.json());   


const verificarToken = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Rutas Protegidas 
const inicioRoutes = require('./routes/inicio');
app.use('/api/inicio', verificarToken, inicioRoutes);

// Rutas de la Bitácora Histórica
const bitacoraRoutes = require('./routes/bitacora');
app.use('/api/bitacora', verificarToken, bitacoraRoutes);

// Rutas de Soporte y Feedback
const soporteRoutes = require('./routes/soporte');
app.use('/api/soporte', verificarToken, soporteRoutes);

// Rutas de Detección de Gas
const deteccionRoutes = require('./routes/deteccion');
app.use('/api/deteccion', verificarToken, deteccionRoutes);

// Rutas de Analítica Predictiva
const analiticaRoutes = require('./routes/analitica');
app.use('/api/analitica', verificarToken, analiticaRoutes);

// Rutas de Usuarios (CRUD Admin)
const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', verificarToken, usuariosRoutes);

// Arrancamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});