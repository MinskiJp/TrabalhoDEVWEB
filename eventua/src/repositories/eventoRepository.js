// Camada de dados dos eventos: so le e grava no arquivo eventos.json
const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, '..', '..', 'data', 'eventos.json');

function lerEventos() {
  const dados = fs.readFileSync(arquivo, 'utf-8');
  return JSON.parse(dados);
}

function salvarEventos(eventos) {
  fs.writeFileSync(arquivo, JSON.stringify(eventos, null, 2));
}

function listar() {
  return lerEventos();
}

// Devolve so os eventos que estao ativos
function listarAtivos() {
  const eventos = lerEventos();
  const ativos = [];
  for (let i = 0; i < eventos.length; i++) {
    if (eventos[i].status === 'ativo') {
      ativos.push(eventos[i]);
    }
  }
  return ativos;
}

function buscarPorId(id) {
  const eventos = lerEventos();
  for (let i = 0; i < eventos.length; i++) {
    if (eventos[i].id === id) {
      return eventos[i];
    }
  }
  return null;
}

function criar(evento) {
  const eventos = lerEventos();
  const novo = {
    id: Date.now().toString(),
    titulo: evento.titulo,
    tipo: evento.tipo,
    data: evento.data,
    local: evento.local,
    capacidade: evento.capacidade,
    vagas: evento.vagas,
    descricao: evento.descricao,
    status: evento.status,
    organizadorId: evento.organizadorId
  };
  eventos.push(novo);
  salvarEventos(eventos);
  return novo;
}

// Atualiza so os campos que vierem dentro de "dados"
function atualizar(id, dados) {
  const eventos = lerEventos();
  for (let i = 0; i < eventos.length; i++) {
    if (eventos[i].id === id) {
      if (dados.titulo !== undefined) eventos[i].titulo = dados.titulo;
      if (dados.tipo !== undefined) eventos[i].tipo = dados.tipo;
      if (dados.data !== undefined) eventos[i].data = dados.data;
      if (dados.local !== undefined) eventos[i].local = dados.local;
      if (dados.capacidade !== undefined) eventos[i].capacidade = dados.capacidade;
      if (dados.vagas !== undefined) eventos[i].vagas = dados.vagas;
      if (dados.descricao !== undefined) eventos[i].descricao = dados.descricao;
      if (dados.status !== undefined) eventos[i].status = dados.status;
      salvarEventos(eventos);
      return eventos[i];
    }
  }
  return null;
}

function remover(id) {
  const eventos = lerEventos();
  const novaLista = [];
  for (let i = 0; i < eventos.length; i++) {
    if (eventos[i].id !== id) {
      novaLista.push(eventos[i]);
    }
  }
  salvarEventos(novaLista);
}

module.exports = { listar, listarAtivos, buscarPorId, criar, atualizar, remover };
