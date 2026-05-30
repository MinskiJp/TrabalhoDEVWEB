const path = require('path');
const express = require('express');
const session = require('express-session');

const authRoutes = require('./src/routes/authRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Arquivos estaticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Leitura de formularios
app.use(express.urlencoded({ extended: true }));

// Sessao
app.use(session({
  secret: 'eventua-segredo-de-sessao',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 horas
}));

// Disponibiliza o usuario logado para todas as views
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// Rotas
app.use('/', authRoutes);
app.use('/', eventoRoutes);
app.use('/admin', adminRoutes);

// 404 - rota nao encontrada
app.use((req, res) => {
  res.status(404).render('errors/404');
});

module.exports = app;
