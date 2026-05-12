const db = require('../config/db');

const Usuario = {
    // Nota: Por seguridad, no devolvemos el campo password en las consultas GET
    getAll: (callback) => {
        db.query('SELECT id, nombre, email FROM usuarios', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO usuarios SET ?', [data], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE usuarios SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
    },
    // ENDPOINT EXTRA: Buscar usuarios corporativos
    getCorporativos: (callback) => {
        db.query('SELECT id, nombre, email FROM usuarios WHERE email LIKE "%@safecook.com%"', callback);
    }
};

module.exports = Usuario;