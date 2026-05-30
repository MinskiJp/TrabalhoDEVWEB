const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Publicas
router.get('/login', authController.paginaLogin);
router.post('/login', authController.login);
router.get('/cadastro', authController.paginaCadastro);
router.post('/cadastro', authController.cadastro);

// Privada
router.post('/logout', authMiddleware, authController.logout);

// Pagina de acesso negado (acessivel diretamente)
router.get('/403', (req, res) => res.status(403).render('errors/403'));

module.exports = router;
