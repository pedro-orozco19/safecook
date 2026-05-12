const Usuario = require('../models/usuarioModel');

const getAll = (req, res) => {
    Usuario.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getById = (req, res) => {
    Usuario.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(results[0]);
    });
};

const create = (req, res) => {
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Nombre, email y password son obligatorios' });
    }

    Usuario.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Usuario creado desde el panel admin', id: results.insertId });
    });
};

const update = (req, res) => {
    // Para actualizar, solo pedimos nombre y email (no tocamos el password aquí)
    const { nombre, email } = req.body;
    
    if (!nombre || !email) {
        return res.status(400).json({ mensaje: 'Nombre y email son obligatorios para actualizar' });
    }

    Usuario.update(req.params.id, { nombre, email }, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Usuario actualizado correctamente' });
    });
};

const deleteRecord = (req, res) => {
    Usuario.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Usuario eliminado' });
    });
};

const getCorporativos = (req, res) => {
    Usuario.getCorporativos((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { getAll, getById, create, update, delete: deleteRecord, getCorporativos };