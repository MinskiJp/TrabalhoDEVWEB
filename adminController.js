// Controller da area administrativa (gerencia eventos)
const eventoService = require('../services/eventoService');
const inscricaoService = require('../services/inscricaoService');

// Painel: lista todos os eventos com quantos ja se inscreveram
function painel(req, res) {
  const eventos = eventoService.listarTodos();
  for (let i = 0; i < eventos.length; i++) {
    eventos[i].inscritos = eventos[i].capacidade - eventos[i].vagas;
  }
  res.render('dashboard/admin', { eventos: eventos });
}

function formNovo(req, res) {
  res.render('eventos/form', { evento: null, erro: null });
}

function criar(req, res) {
  try {
    eventoService.criar(req.body, req.session.usuario.id);
    res.redirect('/admin');
  } catch (erro) {
    res.status(400).render('eventos/form', { evento: null, erro: erro.message });
  }
}

function formEditar(req, res) {
  const evento = eventoService.buscar(req.params.id);
  if (!evento) {
    return res.status(404).render('errors/404');
  }
  res.render('eventos/form', { evento: evento, erro: null });
}

function atualizar(req, res) {
  try {
    eventoService.atualizar(req.params.id, req.body);
    res.redirect('/admin');
  } catch (erro) {
    const evento = eventoService.buscar(req.params.id);
    res.status(400).render('eventos/form', { evento: evento, erro: erro.message });
  }
}

function remover(req, res) {
  try {
    eventoService.remover(req.params.id);
  } catch (erro) {
    // ignora e volta para o painel
  }
  res.redirect('/admin');
}

// Lista os inscritos de um evento
function inscritos(req, res) {
  const evento = eventoService.buscar(req.params.id);
  if (!evento) {
    return res.status(404).render('errors/404');
  }
  const lista = inscricaoService.listarInscritos(evento.id);
  res.render('dashboard/inscritos', { evento: evento, inscritos: lista });
}

module.exports = { painel, formNovo, criar, formEditar, atualizar, remover, inscritos };
