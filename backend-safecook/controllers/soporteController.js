const Soporte = require('../models/soporteModel');

const getAll = (req, res) => {
    Soporte.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getById = (req, res) => {
    Soporte.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Reporte no encontrado' });
        res.json(results[0]);
    });
};

const create = (req, res) => {
    const { nombre_operador, tipo_reporte, experiencia, calificacion } = req.body;
    
    if (!nombre_operador || !tipo_reporte || !experiencia || !calificacion) {
        return res.status(400).json({ mensaje: 'Todos los campos del formulario son obligatorios' });
    }

    Soporte.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Feedback enviado correctamente', id: results.insertId });
    });
};

const update = (req, res) => {
    const { nombre_operador, tipo_reporte, experiencia, calificacion } = req.body;
    
    if (!nombre_operador || !tipo_reporte || !experiencia || !calificacion) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    Soporte.update(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Reporte actualizado correctamente' });
    });
};

const deleteRecord = (req, res) => {
    Soporte.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Reporte eliminado' });
    });
};

const getQuejas = (req, res) => {
    Soporte.getQuejas((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { getAll, getById, create, update, delete: deleteRecord, getQuejas };