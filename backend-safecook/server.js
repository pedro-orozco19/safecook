const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express(); // creamos la aplicacion

// Middlewares
app.use(cors());           
app.use(express.json());   

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const inicioRoutes = require('./routes/inicio');
app.use('/api/inicio', inicioRoutes);

// Rutas de la Bitácora Histórica
const bitacoraRoutes = require('./routes/bitacora');
app.use('/api/bitacora', bitacoraRoutes);

// Rutas de Soporte y Feedback
const soporteRoutes = require('./routes/soporte');
app.use('/api/soporte', soporteRoutes);

// Rutas de Detección de Gas
const deteccionRoutes = require('./routes/deteccion');
app.use('/api/deteccion', deteccionRoutes);

// Rutas de Analítica Predictiva
const analiticaRoutes = require('./routes/analitica');
app.use('/api/analitica', analiticaRoutes);

// Rutas de Usuarios (CRUD Admin)
const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);

// Arrancamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});