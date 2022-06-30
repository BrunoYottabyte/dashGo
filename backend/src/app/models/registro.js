const mongoose = require('../../db');

const registroSchema = new mongoose.Schema({
  funcionarioId: {
    type: mongoose.Types.ObjectId,
    ref: 'Funcionario',
    required: true,
  },
  treinamentoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Treinamento',
    required: true,
  },
  cargaHoraria: {
    type: Number,
    required: true,
  },
  dataConclusao: {
    type: Date,
    required: [
      true,
      'A data de conclusão é essencial para incluir um registro',
    ],
  },
  dataVencimento: {
    type: Date,
    required: [
      true,
      'A data de vencimento é essencial para incluir um registro',
    ],
  },
  dataCadastro: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Registro', registroSchema);
