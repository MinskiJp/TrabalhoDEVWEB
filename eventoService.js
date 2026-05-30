// Regras de negocio dos eventos
const eventoRepository = require('../repositories/eventoRepository');

function listarPublicos() {
  return eventoRepository.listarAtivos();
}

function listarTodos() {
  return eventoRepository.listar();
}

function buscar(id) {
  return eventoRepository.buscarPorId(id);
}

// Cria um evento depois de validar os campos
function criar(dados, organizadorId) {
  if (!dados.titulo || !dados.tipo || !dados.data || !dados.local || !dados.capacidade) {
    throw new Error('Preencha todos os campos obrigatorios.');
  }

  const capacidade = parseInt(dados.capacidade);
  if (isNaN(capacidade) || capacidade <= 0) {
    throw new Error('A capacidade deve ser um numero maior que zero.');
  }

  const evento = {
    titulo: dados.titulo,
    tipo: dados.tipo,
    data: dados.data,
    local: dados.local,
    capacidade: capacidade,
    vagas: capacidade, // comeca com todas as vagas livres
    descricao: dados.descricao || '',
    status: 'ativo',
    organizadorId: organizadorId
  };
  return eventoRepository.criar(evento);
}

function atualizar(id, dados) {
  const evento = eventoRepository.buscarPorId(id);
  if (!evento) {
    throw new Error('Evento nao encontrado.');
  }

  const capacidade = parseInt(dados.capacidade);
  if (isNaN(capacidade) || capacidade <= 0) {
    throw new Error('A capacidade deve ser um numero maior que zero.');
  }

  // quantas pessoas ja se inscreveram (para manter as vagas certas)
  const inscritos = evento.capacidade - evento.vagas;

  const novosDados = {
    titulo: dados.titulo,
    tipo: dados.tipo,
    data: dados.data,
    local: dados.local,
    capacidade: capacidade,
    vagas: capacidade - inscritos,
    descricao: dados.descricao || '',
    status: dados.status || evento.status
  };
  return eventoRepository.atualizar(id, novosDados);
}

function remover(id) {
  const evento = eventoRepository.buscarPorId(id);
  if (!evento) {
    throw new Error('Evento nao encontrado.');
  }
  eventoRepository.remover(id);
}

module.exports = { listarPublicos, listarTodos, buscar, criar, atualizar, remover };
