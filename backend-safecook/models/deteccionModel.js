const db = require('../config/db');

const Deteccion = {
    getAll: (callback) => {
        db.query('SELECT * FROM deteccion_gas', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM deteccion_gas WHERE id = ?', [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO deteccion_gas SET ?', [data], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE deteccion_gas SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM deteccion_gas WHERE id = ?', [id], callback);
    },
    // ENDPOINT EXTRA: Filtrar niveles altos (Peligro)
    getNivelesAltos: (callback) => {
        db.query('SELECT * FROM deteccion_gas WHERE nivel_gas_ppm > 400', callback);
    }
};

module.exports = Deteccion;
