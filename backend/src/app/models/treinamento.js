const mongoose = require('../../db');

const treinamentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do treinamento é indispensável'],
    unique: [true, 'Já existe um treinamento com esse nome :('],
  },
  cargaHorariaMin: {
    type: Number,
    required: [true, 'O treinamento precisa de uma carga horária'],
  },
  validade: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  dataCadastro: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Treinamento', treinamentoSchema);
