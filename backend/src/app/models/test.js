const mongoose = require('../../db');

const testSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: [true, 'O nome da função é indispensável :)'],
    unique: true,
  },
  treinamentosObrig: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Treinamento',
    },
  ],
  dataCadastro: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('test', testSchema);