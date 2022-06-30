const express = require('express');
const Treinamento = require('../models/treinamento');
const Funcionario = require('../models/funcionario');
const Registro = require('../models/registro');
const Arquivo = require('../models/arquivo');
const Funcao = require('../models/funcao');
const router = express.Router();

const middlewareAuth = require('../middlewares/auth');

// router.use(middlewareAuth);

//Create
router.post('/', async (req, res) => {
  try {
    const treinamento = await Treinamento(req.body).save();
    res.json({
      error: false,
      treinamento,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//Read All
router.get('/', async (req, res) => {
  try {
    const treinamentosBD = await Treinamento.find({});

    //total aplicado de cada treinamento;
    let treinamentos = [];
    for(let treinamento of treinamentosBD){
      let aplicados = await Registro.find({
        treinamentoId: treinamento._id
      })
      aplicados = aplicados.length;
      const merge = {...treinamento._doc, aplicados}
      treinamentos.push(merge)
    }
    

    res.json({ error: false, treinamentos });
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
});

//Update
router.put('/:id', async (req, res) => {
  try {
    const dados = req.body;
    await Treinamento.findByIdAndUpdate(req.params.id, dados);

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    //Deletando Treinamento
    await Treinamento.findByIdAndDelete(req.params.id);

    //apagando todos registro e arquivos vinculados a esse treinamento;
    const registros = await Registro.find({ treinamentoId: req.params.id });
    for (let registro of registros) {
      const arquivos = await Arquivo.find({
        referenciaId: registro._id,
      });
      //apagando arquivos do registro na vez do loop
      for (let arquivo of arquivos) {
        await arquivo.remove();
      }
      //apagando registro
      await Registro.findByIdAndDelete(registro._id);
    }
    //apagando esse treinamento do array de treinamentos dos funcionários
    await Funcionario.updateMany(
      {},
      { $pull: { treinamentos: req.params.id } }
    );

    //apagando esse treinamento do array de treinamentos obrigatorio das funções
    await Funcao.updateMany(
      {},
      { $pull: { treinamentosObrig: req.params.id } }
    );

    res.json({ error: false });
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
});

module.exports = (app) => app.use('/treinamento', router);
