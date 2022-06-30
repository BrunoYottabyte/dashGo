const mongoose = require('../../db');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  last: {
    type: String,
    required: [true, 'Last name is required'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  permissions: {
    type: [String],
    required: true,
  },
  roles: {
    type: [String],
    required: true
  },
  refreshToken: {
    type: String,
  },
  verifyEmail: {
    type: Boolean,
    default: false,
  },
  codeVerifyEmail: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  acesso: {
    type: Number,
    default: 0,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model('User', userSchema);
