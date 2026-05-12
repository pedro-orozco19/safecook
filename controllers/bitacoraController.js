const Bitacora = require('../models/bitacoraModel');

const getAll = (req, res) => {
    Bitacora.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getById = (req, res) => {
    Bitacora.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Registro no encontrado' });
        res.json(results[0]);
    });
};

const create = (req, res) => {
    const { hora_deteccion, nivel_fuga_ppm, accion_hardware, estado } = req.body;
    
    // Validación de negocio: Evitar registros incompletos
    if (!hora_deteccion || !nivel_fuga_ppm || !accion_hardware || !estado) {
        return res.status(400).json({ mensaje: 'Todos los campos de la bitácora son obligatorios' });
    }

    Bitacora.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Registro de bitácora creado', id: results.insertId });
    });
};

const update = (req, res) => {
    const { hora_deteccion, nivel_fuga_ppm, accion_hardware, estado } = req.body;
    
    if (!hora_deteccion || !nivel_fuga_ppm || !accion_hardware || !estado) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    Bitacora.update(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Registro actualizado correctamente' });
    });
};

const deleteRecord = (req, res) => {
    Bitacora.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Registro eliminado' });
    });
};

const getAlertas = (req, res) => {
    Bitacora.getAlertas((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { getAll, getById, create, update, delete: deleteRecord, getAlertas };
