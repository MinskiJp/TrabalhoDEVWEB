// Controller das inscricoes
const inscricaoService = require('../services/inscricaoService');
const eventoService = require('../services/eventoService');

function inscrever(req, res) {
  try {
    inscricaoService.inscrever(req.session.usuario.id, req.params.eventoId);
    res.redirect('/dashboard');
  } catch (erro) {
    // se der erro, volta para a pagina do evento mostrando a mensagem
    const evento = eventoService.buscar(req.params.eventoId);
    res.status(400).render('eventos/detalhe', {
      evento: evento,
      vagas: evento.vagas,
      jaInscrito: false,
      erro: erro.message
    });
  }
}

function cancelar(req, res) {
  try {
    inscricaoService.cancelar(req.session.usuario.id, req.params.id);
  } catch (erro) {
    // em caso de erro simples, so volta para o dashboard
  }
  res.redirect('/dashboard');
}

module.exports = { inscrever, cancelar };
