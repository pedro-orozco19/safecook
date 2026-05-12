const db = require('../config/db');

const Bitacora = {
    // 1. Leer todos los registros (GET)
    getAll: (callback) => {
        db.query('SELECT * FROM bitacora_historica', callback);
    },
    
    // 2. Leer un registro por ID (GET)
    getById: (id, callback) => {
        db.query('SELECT * FROM bitacora_historica WHERE id = ?', [id], callback);
    },
    
    // 3. Crear un nuevo registro (POST)
    create: (data, callback) => {
        db.query('INSERT INTO bitacora_historica SET ?', [data], callback);
    },
    
    // 4. Actualizar un registro (PUT)
    update: (id, data, callback) => {
        db.query('UPDATE bitacora_historica SET ? WHERE id = ?', [data, id], callback);
    },
    
    // 5. Eliminar un registro (DELETE)
    delete: (id, callback) => {
        db.query('DELETE FROM bitacora_historica WHERE id = ?', [id], callback);
    },

    // 6. ENDPOINT EXTRA: Traer solo las alertas enviadas
    getAlertas: (callback) => {
        db.query('SELECT * FROM bitacora_historica WHERE estado = "Alerta Enviada"', callback);
    }
};

module.exports = Bitacora;