// Controller de autenticacao: recebe a requisicao e chama o service
const authService = require('../services/authService');

function paginaLogin(req, res) {
  res.render('auth/login', { erro: null });
}

function paginaCadastro(req, res) {
  res.render('auth/cadastro', { erro: null });
}

function login(req, res) {
  try {
    const usuario = authService.autenticar(req.body.email, req.body.senha);
    // guarda o usuario na sessao (e assim que o sistema "lembra" quem entrou)
    req.session.usuario = usuario;
    res.redirect('/dashboard');
  } catch (erro) {
    res.status(401).render('auth/login', { erro: erro.message });
  }
}

function cadastro(req, res) {
  try {
    authService.cadastrar(req.body);
    res.redirect('/login');
  } catch (erro) {
    res.status(400).render('auth/cadastro', { erro: erro.message });
  }
}

function logout(req, res) {
  req.session.destroy(function () {
    res.redirect('/');
  });
}

module.exports = { paginaLogin, paginaCadastro, login, cadastro, logout };
