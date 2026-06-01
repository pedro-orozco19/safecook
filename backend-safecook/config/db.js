const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '', 
  database: process.env.DB_NAME,
  port: 3306 // Si WAMP usa otro, cámbialo a 3308
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión:', err.message);
    return;
  }
  console.log('✅ ¡CONECTADO A MYSQL CORRECTAMENTE!');
});

module.exports = db;