// Controller dos eventos (paginas publicas + dashboard do participante)
const eventoService = require('../services/eventoService');
const inscricaoService = require('../services/inscricaoService');
const inscricaoRepository = require('../repositories/inscricaoRepository');

// Pagina inicial: mostra os 3 primeiros eventos
function home(req, res) {
  let eventos = eventoService.listarPublicos();
  eventos = eventos.slice(0, 3);
  res.render('home', { eventos: eventos });
}

// Lista de eventos, com filtro opcional por tipo
function listar(req, res) {
  const tipo = req.query.tipo;
  let eventos = eventoService.listarPublicos();
  if (tipo === 'corporativo' || tipo === 'festa') {
    eventos = eventos.filter(e => e.tipo === tipo);
  }
  res.render('eventos/lista', { eventos: eventos, filtro: tipo || 'todos' });
}

// Detalhe de um evento
function detalhe(req, res) {
  const evento = eventoService.buscar(req.params.id);
  if (!evento) {
    return res.status(404).render('errors/404');
  }

  // verifica se o usuario logado ja esta inscrito neste evento
  let jaInscrito = false;
  if (req.session.usuario) {
    const inscricao = inscricaoRepository.buscar(req.session.usuario.id, evento.id);
    if (inscricao && inscricao.status === 'confirmada') {
      jaInscrito = true;
    }
  }

  res.render('eventos/detalhe', {
    evento: evento,
    vagas: evento.vagas,
    jaInscrito: jaInscrito,
    erro: null
  });
}

// Dashboard do participante: mostra as inscricoes dele
function dashboard(req, res) {
  const inscricoes = inscricaoService.listarDoUsuario(req.session.usuario.id);
  res.render('dashboard/participante', { inscricoes: inscricoes });
}

module.exports = { home, listar, detalhe, dashboard };
