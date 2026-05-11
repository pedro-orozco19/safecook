const db = require('../config/db');

const getInicio = (req, res) => {
    db.query('SELECT COUNT(*) AS totalUsuarios FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            mensaje: "Bienvenido al sistema SafeCook",
            fecha: new Date().toISOString(),
            modulos: [
                "Landing Page y Login",
                "Dashboard de Monitoreo",
                "Analítica Predictiva",
                "Bitácora Histórica",
                "Soporte y Feedback"
            ], 
            datoDinamico: {
                totalUsuariosRegistrados: results[0].totalUsuarios
            }
        });
    });
};

module.exports = { getInicio };