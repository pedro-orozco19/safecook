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

// Arrancamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});