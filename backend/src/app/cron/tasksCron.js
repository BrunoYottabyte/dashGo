const Registro = require('../models/registro');
const User = require('../models/users');
const mailer = require('../../modules/mailer');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment');
moment.locale('pt-br');
const sendRecordsExpired = cron.schedule(
  '0 0 13 * * MON', //horario utc 13 -> 10 da manha
  async () => {
    try {
      console.log('Lendo script');
      const now = new Date();
      const dia = 1000 * 60 * 60 * 24;

      let registerPendencies = [];
      let attrs;
      const registros = await Registro.find({}).populate([
        { path: 'treinamentoId', select: 'nome -_id' },
        {
          path: 'funcionarioId',
          select: 'nome',
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
            expiresIn: dias,
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
        return console.log('Nenhum registro expirado ou perto de expirar');

      // RECUPERANDO TODOS OS ADM PARA MANDAR O EMAIL
      const adms = await User.find({
        acesso: 3,
      });
      let mailList = [];
      for (let adm of adms) {
        mailList.push(adm.email);
      }

      mailer.sendMail(
        {
          to: mailList,
          from: 'systemgeogas@outlook.com.br',
          template: 'expired',
          subject: 'Expired trainings',
          cc: ['wribeiro@geogas.com.br', 'asantos@geogas.com.br'],
          textEncoding: 'base64',
          attachments: [
            {
              filename: 'logo.png',
              path: path.resolve(
                __dirname,
                '..',
                '..',
                'modules/assets/logo.png'
              ),
              cid: 'logo',
            },
          ],
          context: {
            expiredTraining: registerPendencies,
          },
        },
        (err) => {
          if (err) return console.log('Alguma coisa deu errada', err);
        }
      );

      return console.log('Tudo certo');
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  },
  {
    scheduled: false,
  }
);

module.exports = { sendRecordsExpired };
