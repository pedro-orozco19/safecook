const Analitica = require('../models/analiticaModel');

const getAll = (req, res) => {
    Analitica.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getById = (req, res) => {
    Analitica.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Análisis no encontrado' });
        res.json(results[0]);
    });
};

const create = (req, res) => {
    const { estado_mq2_porcentaje, electrovalvula_porcentaje, salud_actuador_porcentaje, indice_riesgo } = req.body;
    
    if (estado_mq2_porcentaje === undefined || electrovalvula_porcentaje === undefined || salud_actuador_porcentaje === undefined || !indice_riesgo) {
        return res.status(400).json({ mensaje: 'Todos los datos de la analítica son obligatorios' });
    }

    Analitica.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Análisis predictivo registrado', id: results.insertId });
    });
};

const update = (req, res) => {
    const { estado_mq2_porcentaje, electrovalvula_porcentaje, salud_actuador_porcentaje, indice_riesgo } = req.body;
    
    if (estado_mq2_porcentaje === undefined || electrovalvula_porcentaje === undefined || salud_actuador_porcentaje === undefined || !indice_riesgo) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    Analitica.update(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Análisis actualizado correctamente' });
    });
};

const deleteRecord = (req, res) => {
    Analitica.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Análisis eliminado' });
    });
};

const getRiesgosAltos = (req, res) => {
    Analitica.getRiesgosAltos((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { getAll, getById, create, update, delete: deleteRecord, getRiesgosAltos };
