const db = require('../config/db');

const Soporte = {
    getAll: (callback) => {
        db.query('SELECT * FROM soporte_feedback', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM soporte_feedback WHERE id = ?', [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO soporte_feedback SET ?', [data], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE soporte_feedback SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM soporte_feedback WHERE id = ?', [id], callback);
    },
    // ENDPOINT EXTRA: Filtrar solo las quejas
    getQuejas: (callback) => {
        db.query('SELECT * FROM soporte_feedback WHERE tipo_reporte = "Queja"', callback);
    }
};

module.exports = Soporte;