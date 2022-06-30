const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const Arquivo = require('../models/arquivo');

const middlewareAuth = require('../middlewares/auth');

router.use(middlewareAuth);

router.get('/posts', async (req, res) => {
  try {
    const posts = await Arquivo.find();
    return res.json(posts);
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
});

router.post('/', multer(multerConfig).single('file'), async (req, res) => {
  try {
    const { originalname: name, size, key, location: url = '' } = req.file;
    console.log(req.file, 'nao');
    const arquivo = await Arquivo.create({
      name,
      size,
      key,
      url,
    });
    return res.json({ arquivo });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Arquivo.findByIdAndUpdate(req.params.id, req.body);
    return res.send();
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const arquivo = await Arquivo.findById(req.params.id);
    await arquivo.remove();
    return res.status(200).send();
  } catch (err) {
    return res.json({ error: true, message: err.message });
  }
});

module.exports = (app) => app.use('/arquivo', router);
