// Garante que o usuario logado tem perfil de administrador.
function adminMiddleware(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  if (req.session.usuario.perfil !== 'admin') {
    return res.status(403).render('errors/403');
  }
  next();
}

module.exports = adminMiddleware;
