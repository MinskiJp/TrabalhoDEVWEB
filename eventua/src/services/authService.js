// Regras de negocio de autenticacao (cadastro e login)
const bcrypt = require('bcryptjs');
const usuarioRepository = require('../repositories/usuarioRepository');

// Cadastra um novo usuario depois de validar os dados
function cadastrar(dados) {
  if (!dados.nome || !dados.email || !dados.senha) {
    throw new Error('Preencha todos os campos.');
  }
  if (dados.senha.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres.');
  }
  if (dados.senha !== dados.confirmarSenha) {
    throw new Error('As senhas nao coincidem.');
  }

  const jaExiste = usuarioRepository.buscarPorEmail(dados.email);
  if (jaExiste) {
    throw new Error('Ja existe uma conta com este e-mail.');
  }

  // criptografa a senha para nao guardar em texto puro
  const senhaCriptografada = bcrypt.hashSync(dados.senha, 10);

  const novoUsuario = {
    nome: dados.nome,
    email: dados.email,
    senha: senhaCriptografada,
    perfil: 'participante'
  };
  return usuarioRepository.criar(novoUsuario);
}

// Verifica email e senha e devolve o usuario (sem a senha) se estiverem certos
function autenticar(email, senha) {
  const usuario = usuarioRepository.buscarPorEmail(email);
  if (!usuario) {
    throw new Error('E-mail ou senha invalidos.');
  }

  const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new Error('E-mail ou senha invalidos.');
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil
  };
}

module.exports = { cadastrar, autenticar };
