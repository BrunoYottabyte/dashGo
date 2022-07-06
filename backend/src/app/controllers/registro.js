const express = require('express');
const moment = require('moment');
const Registro = require('../models/registro');
const Funcionario = require('../models/funcionario');
const User = require('../models/users');
const router = express.Router();
const Arquivo = require('../models/arquivo');


const middlewareAuth = require('../middlewares/auth');

//nodemailer
const mailer = require('../../modules/mailer.js');
const path = require('path');

// router.use(middlewareAuth);
//Create
router.post('/', async (req, res) => {
  try {
    const registro = req.body;

    // recuperando treinamentos do funcionário
    let { treinamentos } = await Funcionario.findById(
      registro.funcionarioId
    ).select('treinamentos -_id');

    // verificando se o funcionário ja realizou esse treinamento;
    if (treinamentos.includes(registro.treinamentoId)) {
      res.json({
        error: true,
        message: 'O Funcionário já possuí esse treinamento',
      });
      return;
    }

    //atualizando campo treinamentos em funcionario
    await Funcionario.findByIdAndUpdate(req.body.funcionarioId, {
      treinamentos: [...treinamentos, registro.treinamentoId],
    });

    //salvando registro
    const registered = await Registro(req.body).save();

    res.json({ error: false, registered });
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
});

//Read all of a specific employee
router.get('/funcionario/:id', async (req, res) => {
  try {
    const registros = await Registro.find({
      funcionarioId: req.params.id,
    }).populate('treinamentoId');
    res.json({ error: false, registros });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//Read especific register
router.get('/:id', async (req, res) => {
  try {
    const registroFuncionario = await Registro.findById(req.params.id);
    const arquivos = await Arquivo.find({ referenciaId: req.params.id });

    const registros = { ...registroFuncionario._doc, arquivos };

    res.json({ error: false, registros });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//Read all

router.get('/', async (req, res) => {
  try {
    const registros = await Registro.find({});

    //QUANTIDADE DE PESSOAS TREINADAS EM TODOS OS TREINAMENTOS
    let numberOfEmployees = [];
    registros.map((record) => {
      if (!numberOfEmployees.includes(record.funcionarioId.toString()))
        numberOfEmployees.push(record.funcionarioId.toString());
      return;
    });

    numberOfEmployees = numberOfEmployees.length;

    //Registros de 1 semana atras contando apartir da data atual
    var start = moment().day(0),
    end = moment().day(6);

    const week = await Registro.find({ dataCadastro: { $gte: start, $lte: end } });

    res.json({
      error: false,
      ...{ registros: [...registros], numberOfEmployees, week },
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//Update
router.put('/:id', async (req, res) => {
  try {
    const dados = req.body;

    //verificando se o funcionario ja tem algum registro com esse treinamento
    const existentsRegister = await Registro.findOne({
      _id: { $ne: dados._id },
      funcionarioId: dados.funcionarioId,
      treinamentoId: dados.treinamentoId,
    });

    if (existentsRegister) {
      return res.json({
        error: true,
        message: 'O funcionário já realizou esse treinamento.',
      });
    }

    const registered = await Registro.findByIdAndUpdate(req.params.id, dados);
    res.json({ error: false, registered });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//Expired and close to expiring records
router.post('/expired', async (req, res) => {
  try {
    const now = new Date();
    const dia = 1000 * 60 * 60 * 24;
    let registerPendencies = [];
    let attrs;
    const registros = await Registro.find({}).populate([
      { path: 'treinamentoId', select: 'nome' },
      {
        path: 'funcionarioId',
        populate: {
          path: 'funcaoId',
          select: 'nome',
        },
      },
    ]);

    //Filtrando somente os registros vencidos;
    const vencidos = registros
      .filter((registro) => {
        const dias = ((now - registro.dataVencimento) / dia).toFixed(0);

        if (dias >= 0) {
          return registro;
        }
      })
      .map((registro) => {
        const dias = ((now - registro.dataVencimento) / dia).toFixed(0);

        return {
          ...registro._doc,
          dataVencimento: moment(registro.dataVencimento).format('L'),
          training: registro.treinamentoId.nome,
          name: registro.funcionarioId.nome,
          occupation: registro.funcionarioId.funcaoId.nome,
          expiresIn: Math.abs(dias),
        };
      });

    if (vencidos.length > 0) {
      attrs = { expired: vencidos };
    }

    vencidos.sort(function (a, b) {
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    const aVencer = registros
      .filter((registro) => {
        const dias = ((now - registro.dataVencimento) / dia).toFixed(0);
        if (dias >= -30 && dias < 0) {
          console.log(registro);
          return registro;
        }
      })
      .map((registro) => {
        const dias = ((now - registro.dataVencimento) / dia).toFixed(0);

        return {
          ...registro._doc,
          dataVencimento: moment(registro.dataVencimento).format('L'),
          training: registro.treinamentoId.nome,
          name: registro.funcionarioId.nome,
          occupation: registro.funcionarioId.funcaoId.nome,
          expiresIn: Math.abs(dias),
        };
        //TRANSFORMANDO DIAS NEGATIVOS PARA POSITIVO POIS O EMAIL JA DIZ QUE É DIAS PERTO DE VENCER
      });

    aVencer.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    if (aVencer.length > 0) {
      attrs = { ...attrs, closeToExpiring: aVencer };
    }

    if (aVencer.length > 0 || vencidos.length > 0) {
      registerPendencies.push(attrs);
    }

    if (registerPendencies.length === 0)
      return res.json({ message: 'Not found register' });

    // RECUPERANDO TODOS OS ADM PARA MANDAR O EMAIL
    const adms = await User.find({
      acesso: 3,
    });
    // for (let adm of adms) {
    // mailer.sendMail(
    //   {
    //     to: 'bsiqueira@geogas.com.br',
    //     from: 'systemgeogas@outlook.com.br',
    //     template: 'expired',
    //     subject: 'Expired trainings',
    //     // cc: ['wribeiro@geogas.com.br', 'asantos@geogas.com.br'],
    //     textEncoding: 'base64',

    //     attachments: [
    //       {
    //         filename: 'logo.png',
    //         path: path.resolve(
    //           __dirname,
    //           '..',
    //           '..',
    //           'modules/assets/logo.png'
    //         ),
    //         cid: 'logo',
    //       },
    //     ],
    //     context: {
    //       expiredTraining: registerPendencies,
    //     },
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // }

    return res.json({ attrs });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//TEST

router.delete('/:id', async (req, res) => {
  try {
    //recuperando registro para apagar do array de treinamentos do funcionario
    const registro = await Registro.findById(req.params.id);
    //recuperando treinamentos do funcionario desse registro
    const { treinamentos } = await Funcionario.findById(registro.funcionarioId);
    //deletando o treinamento do arr do funcionario
    treinamentos.splice(treinamentos.indexOf(registro.treinamentoId), 1);

    //deletando arquivos associados a esse Registro
    //utilizando for porque deleteMany nao apaga na aws
    const arquivos = await Arquivo.find({
      referenciaId: registro._id,
    });
    for (let arquivo of arquivos) {
      await arquivo.remove();
    }
    //atualizando funcionario
    await Funcionario.findByIdAndUpdate(registro.funcionarioId, {
      treinamentos: treinamentos,
    });

    await Registro.findByIdAndDelete(req.params.id);
    res.send();
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = (app) => app.use('/registro', router);
