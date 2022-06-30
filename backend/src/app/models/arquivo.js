const mongoose = require('../../db');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

//o S3 ja le as variaveis ambientes
const s3 = new aws.S3();

const arquivoSchema = new mongoose.Schema({
  referenciaId: {
    type: mongoose.Types.ObjectId,
    refPath: 'model',
  },
  model: {
    type: String,
    required: true,
    default: 'Registro',
  },
  name: String,
  size: Number,
  key: String,
  url: String,
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

arquivoSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

arquivoSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({
        Bucket: 'system-geogas',
        Key: this.key,
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key)
    );
  }
});

module.exports = mongoose.model('Arquivo', arquivoSchema);
