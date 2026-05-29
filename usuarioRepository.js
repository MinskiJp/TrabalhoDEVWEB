// Camada de dados dos usuarios: so le e grava no arquivo usuarios.json
const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, '..', '..', 'data', 'usuarios.json');

// Le o arquivo e devolve a lista de usuarios
function lerUsuarios() {
  const dados = fs.readFileSync(arquivo, 'utf-8');
  return JSON.parse(dados);
}

// Grava a lista de usuarios no arquivo
function salvarUsuarios(usuarios) {
  fs.writeFileSync(arquivo, JSON.stringify(usuarios, null, 2));
}

function listar() {
  return lerUsuarios();
}

function buscarPorEmail(email) {
  const usuarios = lerUsuarios();
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return usuarios[i];
    }
  }
  return null;
}

function buscarPorId(id) {
  const usuarios = lerUsuarios();
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      return usuarios[i];
    }
  }
  return null;
}

function criar(usuario) {
  const usuarios = lerUsuarios();
  const novo = {
    id: Date.now().toString(),
    nome: usuario.nome,
    email: usuario.email,
    senha: usuario.senha,
    perfil: usuario.perfil
  };
  usuarios.push(novo);
  salvarUsuarios(usuarios);
  return novo;
}

module.exports = { listar, buscarPorEmail, buscarPorId, criar };
