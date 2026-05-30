// Camada de dados das inscricoes: so le e grava no arquivo inscricoes.json
const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, '..', '..', 'data', 'inscricoes.json');

function lerInscricoes() {
  const dados = fs.readFileSync(arquivo, 'utf-8');
  return JSON.parse(dados);
}

function salvarInscricoes(inscricoes) {
  fs.writeFileSync(arquivo, JSON.stringify(inscricoes, null, 2));
}

function listar() {
  return lerInscricoes();
}

function listarPorUsuario(usuarioId) {
  const inscricoes = lerInscricoes();
  const resultado = [];
  for (let i = 0; i < inscricoes.length; i++) {
    if (inscricoes[i].usuarioId === usuarioId) {
      resultado.push(inscricoes[i]);
    }
  }
  return resultado;
}

function listarPorEvento(eventoId) {
  const inscricoes = lerInscricoes();
  const resultado = [];
  for (let i = 0; i < inscricoes.length; i++) {
    if (inscricoes[i].eventoId === eventoId) {
      resultado.push(inscricoes[i]);
    }
  }
  return resultado;
}

// Procura uma inscricao de um usuario em um evento
function buscar(usuarioId, eventoId) {
  const inscricoes = lerInscricoes();
  for (let i = 0; i < inscricoes.length; i++) {
    if (inscricoes[i].usuarioId === usuarioId && inscricoes[i].eventoId === eventoId) {
      return inscricoes[i];
    }
  }
  return null;
}

function criar(inscricao) {
  const inscricoes = lerInscricoes();
  const nova = {
    id: Date.now().toString(),
    usuarioId: inscricao.usuarioId,
    eventoId: inscricao.eventoId,
    status: inscricao.status,
    criadaEm: new Date().toISOString()
  };
  inscricoes.push(nova);
  salvarInscricoes(inscricoes);
  return nova;
}

function atualizar(id, dados) {
  const inscricoes = lerInscricoes();
  for (let i = 0; i < inscricoes.length; i++) {
    if (inscricoes[i].id === id) {
      if (dados.status !== undefined) inscricoes[i].status = dados.status;
      salvarInscricoes(inscricoes);
      return inscricoes[i];
    }
  }
  return null;
}

module.exports = { listar, listarPorUsuario, listarPorEvento, buscar, criar, atualizar };
