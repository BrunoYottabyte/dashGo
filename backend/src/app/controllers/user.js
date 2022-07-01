const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const mailer = require('../../modules/mailer');
const {v4 : uuid} = require('uuid');
const refeshAuth = require('../middlewares/refreshAuth');
const checkAuthUser = require('../middlewares/auth')

//forgot method
const crypto = require('crypto');
const path = require('path');

const createRefreshToken = (email) => {
  const refreshToken = uuid();
  return refreshToken;
}

const generateJwtAndRefreshToken = async(email, payload = {}) =>{
  const token = jwt.sign(payload, authConfig.secret, {
    subject: email,
    expiresIn: 60 * 15 // 15 min
  })

  const refreshToken = createRefreshToken(email);
  await User.findOneAndUpdate({email}, {
      refreshToken
  })
  return {
    token, 
    refreshToken
  }
}

const generateTokenPassword = () => {
  const rand = Math.ceil(5 + Math.random() * (10 - 5));
  return crypto.randomBytes(rand).toString('hex');
};

router.post('/', async (req, res) => {
  const { email, first, last, password } = req.body;
  const administratorsDefault = ['bsiqueira@geogas.com.br', 'lvalle@geogas.com.br'];
  try {
    let verifyEmail = email.split('@')[1].split('.')[0];

    if (!/^geogas$/i.test(verifyEmail))
      return res.json({
        error: true,
        message: 'You need to be a Geogas employee',
      });

    if (await User.findOne({ email })) {
      return res.send({ error: true, message: 'User already exists' });
    }

    async function createUser(){
      const user = {
        name: first,
        last,
        email,
        permissions: ['metrics.list'],
        roles: ['user'],
        password,
        codeVerifyEmail: hash,
      }
      if(administratorsDefault.includes(email)){
        user.permissions.push('metrics.edit');
        user.roles.push('administrator');
      }
      await User(user).save();

      return user;
    }

    let ac = [];
    for (let i = 1; i <= 6; i++) {
      ac.push(Math.floor(Math.random() * 10));
    }
    const hash = ac.join('');

    try{
      mailer.sendMail(
        {
          to: email,
          from: 'bsiqueira@geogas.com.br',
          subject: 'Check your email :)',
          template: 'verifyEmail',
          context: {
            name: first,
            hash,
            app: process.env.APP_EMAIL,
          },
          attachments: [
            {
              filename: 'verifyMail.png',
              path: path.resolve(
                __dirname,
                '..',
                '..',
                'modules/assets/verifyMail.png'
              ),
              cid: 'mail',
            },
          ],
        },
        (err) => {
            if(err){
  
               return res.json({ error: true, message: 'Erro on verify email, try again' });
            }
   
           Promise.resolve(original);
        }
     
      );

      async function continueCreate() {
          const user = await createUser();
          res.status(200).json({
          error: false,
          user,
          });
      }

      return new Promise(continueCreate);
     
    }catch(err){
      console.log('catch')
      return res.json({error: true});
    }

  } catch (err) {
    return res.json({ error: true, message: 'Registration failed' });
  }
});

router.get('/me', checkAuthUser ,async(req, res) =>{
    const email = req.user;
    const user = await User.findOne({email}).select('permissions roles');

    if(!user){
      return res
              .status(401)
                .json({error: true, message: 'User not found.'})
    }

    return res.json({
      email,
      permissions: user.permissions,
      roles: user.roles
    })

})

router.post('/refresh', refeshAuth, async (req, res) => {
  const email = req.user;
  const {refreshToken} = req.body;

  // console.log()
  
  const user = await User.findOne({email});

  if(!user){
    return res.status(401).json({error: true, message: 'User not found'});
  }

  if(!refreshToken){
    return res.status(401).json({error: true, message: 'Refresh token is required.'});
  }

  isValidRefreshToken = user.refreshToken === refreshToken;
  
  if(!isValidRefreshToken){
    return res.status(401).json({error: true, message: 'Refresh token is invalid.'})
  }

  const {token, refreshToken: newRefreshToken} = await generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles
  })

  return res.json({
    token,
    refreshToken: newRefreshToken,
    permissions: user.permissions,
    roles: user.roles
  })

})

router.post('/verifyEmail', async (req, res) => {
  const { code, user } = req.body;
  try {
    const userBD = await User.findOne({ email: user.email });
    if (!userBD) return res.json({ error: true, message: 'User not found :(' });
    if (code != userBD.codeVerifyEmail)
      return res.json({ error: true, message: 'Code invalid' });

    await User.findByIdAndUpdate(userBD._id, {
      verifyEmail: true,
      codeVerifyEmail: '',
    });

    res.json({ message: 'success' });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(401).json({ error: true, message: 'User not found' });

  if (!user.verifyEmail) {
    let ac = [];
    for (let i = 1; i <= 6; i++) {
      ac.push(Math.floor(Math.random() * 10));
    }
    const hash = ac.join('');

    await User.findByIdAndUpdate(user._id, {
      codeVerifyEmail: hash,
    });

    mailer.sendMail(
      {
        from: 'bsiqueira@geogas.com.br',
        to: email,
        subject: 'Check your email :)',
        template: 'verifyEmail',
        attachments: [
          {
            filename: 'verifyMail.png',
            path: path.resolve(
              __dirname,
              '..',
              '..',
              'modules/assets/verifyMail.png'
            ),
            cid: 'mail',
          },
        ],
        context: {
          name: user.name,
          hash,
        },
      },
      (err, info) => {
        console.log(info)
        if (err){
        console.log(err);
          console.log('não consegui entregar');
          return;
        }
          // return res.json({ error: true, message: 'Erro on verify email, try again' });
      }
    );

     res.json({ error: true, message: 'Email not verified' });
     return;
  }

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: true, message: 'Invalid password' });
  user.password = undefined;

  const {token, refreshToken} = await generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles
  })

  return res.json({ token, refreshToken, permissions: user.permissions, roles: user.roles});

});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.json({ error: true, message: 'User not found' });
    const token = generateTokenPassword();
    const now = new Date();

    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user._id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: 'bsiqueira@geogas.com.br',
        template: 'email',
        subject: 'Reset geogas system password :)',
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
          name: user.name.split(' ')[0],
          token,
          app: process.env.APP_EMAIL,
        },
      },
      (err) => {
        if (err) {
          return res.json({
            error: true,
            message: err,
          });
        }

        return res.json({ message: 'Success' });
      }
    );
  } catch (err) {
    res.json({ error: true, message: 'Erro on forgot password, try again' });
  }
});

router.post('/validation_reset', async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
    }).select('+passwordResetToken passwordResetExpires');

    if (!user) return res.json({ error: true, message: 'Token Invalid' });

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res.json({ error: true, message: 'expired token' });

    res.send();
  } catch (err) {
    res.json({ error: true, message: 'Could not validate, please try later' });
    return;
  }
});

router.post('/reset_password', async (req, res) => {
  const { token, newPasswords } = req.body;
  console.log(token);
  try {
    const user = await User.findOne({ passwordResetToken: token }).select(
      '+passwordResetToken passwordResetExpires'
    );

    if (!user) return res.json({ error: true, message: 'User not found' });

    if (token !== user.passwordResetToken)
      return res.json({ error: true, message: 'Token Invalid' });

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res.json({
        error: true,
        message: 'Token expired, generate a new one',
      });

    user.password = newPasswords.pass;

    user.passwordResetToken = generateTokenPassword();

    await user.save();

    res.json({ error: false, message: 'Success' });
  } catch (err) {
    res.json({ error: true, message: 'Cannot reset password, try again' });
  }
});

module.exports = (app) => app.use('/user', router);
