const Deteccion = require('../models/deteccionModel');

const getAll = (req, res) => {
    Deteccion.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getById = (req, res) => {
    Deteccion.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Registro no encontrado' });
        res.json(results[0]);
    });
};

const create = (req, res) => {
    const { nivel_gas_ppm, estado_valvula, estado_extractor } = req.body;
    
    if (nivel_gas_ppm === undefined || !estado_valvula || !estado_extractor) {
        return res.status(400).json({ mensaje: 'Todos los campos de sensores son obligatorios' });
    }

    Deteccion.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Lectura de sensores registrada', id: results.insertId });
    });
};

const update = (req, res) => {
    const { nivel_gas_ppm, estado_valvula, estado_extractor } = req.body;
    
    if (nivel_gas_ppm === undefined || !estado_valvula || !estado_extractor) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    Deteccion.update(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Lectura actualizada correctamente' });
    });
};

const deleteRecord = (req, res) => {
    Deteccion.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Lectura eliminada' });
    });
};

const getNivelesAltos = (req, res) => {
    Deteccion.getNivelesAltos((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { getAll, getById, create, update, delete: deleteRecord, getNivelesAltos };
