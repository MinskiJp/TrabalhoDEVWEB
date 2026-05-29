// Popula os arquivos JSON com um admin e tres eventos de exemplo.
// Uso: node seed.js
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const senhaAdmin = bcrypt.hashSync('admin123', 10);
const senhaUser = bcrypt.hashSync('123456', 10);

const usuarios = [
  { id: 'admin1', nome: 'Administrador', email: 'admin@eventua.com', senha: senhaAdmin, perfil: 'admin' },
  { id: 'user1', nome: 'Joao Silva', email: 'joao@email.com', senha: senhaUser, perfil: 'participante' }
];

const eventos = [
  { id: 'ev1', titulo: 'Workshop de Inovacao', tipo: 'corporativo', data: '15/06/2025 14:00', local: 'Centro de Convencoes', capacidade: 50, vagas: 50, descricao: 'Workshop sobre metodologias ageis e inovacao corporativa, com palestrantes convidados e dinamicas em grupo.', status: 'ativo', organizadorId: 'admin1' },
  { id: 'ev2', titulo: 'Festa Junina Corporativa', tipo: 'festa', data: '28/06/2025 19:00', local: 'Espaco Gourmet', capacidade: 80, vagas: 80, descricao: 'Confraternizacao junina da empresa com comidas tipicas, musica ao vivo e brincadeiras.', status: 'ativo', organizadorId: 'admin1' },
  { id: 'ev3', titulo: 'Treinamento de Lideranca', tipo: 'corporativo', data: '10/07/2025 09:00', local: 'Sala de Treinamento A', capacidade: 20, vagas: 20, descricao: 'Programa intensivo de desenvolvimento de competencias de lideranca para gestores.', status: 'ativo', organizadorId: 'admin1' }
];

const pastaData = path.join(__dirname, 'data');
fs.writeFileSync(path.join(pastaData, 'usuarios.json'), JSON.stringify(usuarios, null, 2));
fs.writeFileSync(path.join(pastaData, 'eventos.json'), JSON.stringify(eventos, null, 2));
fs.writeFileSync(path.join(pastaData, 'inscricoes.json'), JSON.stringify([], null, 2));

console.log('Seed concluido.');
console.log('Admin:        admin@eventua.com / admin123');
console.log('Participante: joao@email.com / 123456');
