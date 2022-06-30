const nodemailer = require('nodemailer');

const { host, port, user, pass } = require('./config/user.json');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

var transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3',
  },
  
});

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('./src/modules/views'),
    defaultLayout: false,
    helpers: {
        ifCond: (v1, operator, v2, options) => {
          switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1.length > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
        }
    }
  },
  viewPath: path.resolve('./src/modules/views'),
  extName: '.handlebars',
};

transport.use('compile', hbs(handlebarOptions));

module.exports = transport;
