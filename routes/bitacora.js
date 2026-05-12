const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bitacoraController');
const verificarToken = require('../middlewares/authMiddleware');

// Rutas de lectura (pueden ser públicas o protegidas, las dejaremos públicas por simplicidad según tu rúbrica)
router.get('/', ctrl.getAll);
router.get('/alertas', ctrl.getAlertas); // ENDPOINT EXTRA
router.get('/:id', ctrl.getById);

// Rutas de escritura (ESTRICTAMENTE PROTEGIDAS con verificarToken) 
router.post('/', verificarToken, ctrl.create);
router.put('/:id', verificarToken, ctrl.update);
router.delete('/:id', verificarToken, ctrl.delete);

module.exports = router;