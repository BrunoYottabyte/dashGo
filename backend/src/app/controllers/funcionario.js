const express = require('express');
const router = express.Router();
const Funcionario = require('../models/funcionario');
const Funcao = require('../models/funcao');
const Treinamento = require('../models/treinamento');
const Registro = require('../models/registro');
const middlewareAuth = require('../middlewares/auth');

// router.use(middlewareAuth);

router.post('/', async (req, res) => {
  try {
    const funcionario = await Funcionario(req.body).save();
    res.json({
      error: false,
      funcionario,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await Funcionario.find({}).populate({
      path: 'funcaoId',
      select: 'nome',
    });

    let funcionarios = [];
    let pendentes;
    let listaPendentes;
    let totalCargaHoraria;
    let totalSistema = 0;
    for (funcionario of response) {
      pendentes = [];
      listaPendentes = [];

      //recuperando todos os registros desse funcionario
      let registros = await Registro.find({
        funcionarioId: funcionario._id,
      }).populate('treinamentoId');

      //recuperando a carga horaria total de cada Funcionário
      arr = registros.map((treinamento) => treinamento.cargaHoraria);
      //somando a carga horaria recuperada
      totalCargaHoraria = arr.reduce((ac, va) => {
        ac += va;
        return ac;
      }, 0);

      totalSistema += totalCargaHoraria;

      //Recuperando treinamentos obrigatórios de acordo com a função do usuário

      let { treinamentosObrig } = await Funcao.findById(
        funcionario.funcaoId
      ).select('treinamentosObrig -_id');

      //retornando apenas os treinamentos pendentes
      for (obrigatorios of treinamentosObrig) {
        if (
          !funcionario.treinamentos.some(
            (item) => item._id.valueOf() === obrigatorios.valueOf()
          )
        ) {
          pendentes.push(obrigatorios);
        }
      }

      for (let pendente of pendentes) {
        //
        listaPendentes.push(
          await Treinamento.findById(pendente).select('-__v')
        );
      }

      

      funcionario = {
        ...funcionario._doc,
        listaPendentes,
        totCargaHorFunc: totalCargaHoraria,
      };
      funcionarios.push(funcionario);
    }

    // Paginação
    const { page, per_page = 10 } = req.query;

    const total = funcionarios.length;
    console.log(page);
    const pageStart = (Number(page) - 1) * Number(per_page);
    const pageEnd = pageStart + Number(per_page);

    const employees = funcionarios
      .slice(pageStart, pageEnd);

    

    res.set('x-total-count', String(total));
    res.set('Access-Control-Expose-Headers', 'x-total-count')

    return res.json({
      error: false,
      employees,
      systemWorkload: totalSistema
    });
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const dados = req.body;
    const response = await Funcionario.findByIdAndUpdate(req.params.id, dados);
    res.json({ error: false, response });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    //Deletando Funcionario
    await Funcionario.findByIdAndDelete(req.params.id);
    //apagando todos os registros desse funcionario;
    await Registro.deleteMany({
      funcionarioId: req.params.id,
    });
    res.json({ error: false });
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
});

module.exports = (app) => app.use('/funcionario', router);
