const express = require('express');
const Funcao = require('../models/funcao');
const router = express.Router();
const middlewareAuth = require('../middlewares/auth');

router.use(middlewareAuth);

router.post('/', async (req, res) => {
  try {
    const funcao = await Funcao(req.body).save();
    res.json({
      error: false,
      funcao,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get('/', async(req, res) => {
  try{
    const allFunction = await Funcao.find({}).populate({
      path: 'treinamentosObrig',
      select: 'nome'
    });
    
    res.json({error: false, allFunction});

  }catch(err){
    res.json({error: true, message:err.message})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const dados = req.body;
    await Funcao.findByIdAndUpdate(req.params.id, req.body);
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete('/:id', async(req,res) => {
  try{
    await Funcao.findByIdAndDelete(req.params.id);
    res.json({error: false});
  }catch(err){
    res.json({error: true, message: err.message})
  }
})

module.exports = (app) => app.use('/funcao', router);
