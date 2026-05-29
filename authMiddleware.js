// Garante que existe um usuario logado na sessao.
function authMiddleware(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  next();
}

module.exports = authMiddleware;
