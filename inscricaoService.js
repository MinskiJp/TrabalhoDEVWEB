// Regras de negocio das inscricoes
const inscricaoRepository = require('../repositories/inscricaoRepository');
const eventoRepository = require('../repositories/eventoRepository');
const usuarioRepository = require('../repositories/usuarioRepository');

// Inscreve um usuario em um evento
function inscrever(usuarioId, eventoId) {
  const evento = eventoRepository.buscarPorId(eventoId);
  if (!evento) {
    throw new Error('Evento nao encontrado.');
  }
  if (evento.status !== 'ativo') {
    throw new Error('Este evento nao esta aceitando inscricoes.');
  }

  // ja esta inscrito?
  const inscricaoExistente = inscricaoRepository.buscar(usuarioId, eventoId);
  if (inscricaoExistente && inscricaoExistente.status === 'confirmada') {
    throw new Error('Voce ja esta inscrito neste evento.');
  }

  // ainda tem vaga?
  if (evento.vagas <= 0) {
    throw new Error('Nao ha mais vagas disponiveis para este evento.');
  }

  // tira uma vaga do evento e salva
  const novasVagas = evento.vagas - 1;
  eventoRepository.atualizar(eventoId, { vagas: novasVagas });

  // se ja existia uma inscricao cancelada, reativa ela
  if (inscricaoExistente) {
    return inscricaoRepository.atualizar(inscricaoExistente.id, { status: 'confirmada' });
  }

  // senao, cria uma inscricao nova
  const novaInscricao = {
    usuarioId: usuarioId,
    eventoId: eventoId,
    status: 'confirmada'
  };
  return inscricaoRepository.criar(novaInscricao);
}

// Cancela uma inscricao e devolve a vaga para o evento
function cancelar(usuarioId, inscricaoId) {
  const inscricoes = inscricaoRepository.listar();
  let inscricao = null;
  for (let i = 0; i < inscricoes.length; i++) {
    if (inscricoes[i].id === inscricaoId) {
      inscricao = inscricoes[i];
    }
  }

  if (!inscricao) {
    throw new Error('Inscricao nao encontrada.');
  }
  if (inscricao.usuarioId !== usuarioId) {
    throw new Error('Esta inscricao nao pertence a voce.');
  }

  // devolve a vaga para o evento
  if (inscricao.status === 'confirmada') {
    const evento = eventoRepository.buscarPorId(inscricao.eventoId);
    if (evento) {
      const novasVagas = evento.vagas + 1;
      eventoRepository.atualizar(evento.id, { vagas: novasVagas });
    }
  }

  return inscricaoRepository.atualizar(inscricaoId, { status: 'cancelada' });
}

// Lista as inscricoes de um usuario, com os dados do evento juntos
function listarDoUsuario(usuarioId) {
  const inscricoes = inscricaoRepository.listarPorUsuario(usuarioId);
  for (let i = 0; i < inscricoes.length; i++) {
    inscricoes[i].evento = eventoRepository.buscarPorId(inscricoes[i].eventoId);
  }
  return inscricoes;
}

// Lista os inscritos de um evento, com os dados do usuario juntos
function listarInscritos(eventoId) {
  const inscricoes = inscricaoRepository.listarPorEvento(eventoId);
  for (let i = 0; i < inscricoes.length; i++) {
    inscricoes[i].usuario = usuarioRepository.buscarPorId(inscricoes[i].usuarioId);
  }
  return inscricoes;
}

module.exports = { inscrever, cancelar, listarDoUsuario, listarInscritos };
