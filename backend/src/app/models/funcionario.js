const mongoose = require('../../db');

const funcionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  funcaoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Funcao',
    required: [true, 'É obrigatório definir uma função'],
  },
  funcionarioProprio: {
    type: String,
    enum: ['Sim', 'Não'],
    default: 'Sim',
    required: true,
  },
  treinamentoExterno: {
    type: String,
    enum: ['Sim', 'Não'],
    default: 'Sim',
    required: false,
  },
  sexo: {
    type: String,
    required: true,
    enum: ['M', 'F']
  },
  treinamentos: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Treinamento',
    },
  ],
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);
