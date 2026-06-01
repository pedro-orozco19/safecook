const db = require('../config/db');

const Analitica = {
    getAll: (callback) => {
        db.query('SELECT * FROM analitica_predictiva', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM analitica_predictiva WHERE id = ?', [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO analitica_predictiva SET ?', [data], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE analitica_predictiva SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM analitica_predictiva WHERE id = ?', [id], callback);
    },
    // ENDPOINT EXTRA: Filtrar mantenimientos urgentes
    getRiesgosAltos: (callback) => {
        db.query('SELECT * FROM analitica_predictiva WHERE indice_riesgo IN ("Alto", "Critico")', callback);
    }
};

module.exports = Analitica;