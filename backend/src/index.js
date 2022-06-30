require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParse = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const tasks = require('./app/cron/tasksCron');

app.use(bodyParse.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

require('./app/controllers/index')(app); //passando o app para o controller para utilizar la dentro
/*process.env.PORT ||*/
app.listen(/*process.env.PORT ||*/3001, () => {
  console.log('O servidor está funcionando :)');
  // tasks.sendRecordsExpired.start();
});
