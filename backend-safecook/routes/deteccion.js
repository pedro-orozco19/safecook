const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/deteccionController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', ctrl.getAll);
router.get('/peligro', ctrl.getNivelesAltos); // ENDPOINT EXTRA
router.get('/:id', ctrl.getById);

router.post('/', verificarToken, ctrl.create);
router.put('/:id', verificarToken, ctrl.update);
router.delete('/:id', verificarToken, ctrl.delete);

module.exports = router;
