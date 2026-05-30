const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Todas as rotas deste arquivo exigem login + perfil admin
router.use(authMiddleware, adminMiddleware);

router.get('/', adminController.painel);
router.get('/eventos/novo', adminController.formNovo);
router.post('/eventos', adminController.criar);
router.get('/eventos/:id/editar', adminController.formEditar);
router.post('/eventos/:id', adminController.atualizar);
router.post('/eventos/:id/excluir', adminController.remover);
router.get('/eventos/:id/inscritos', adminController.inscritos);

module.exports = router;
