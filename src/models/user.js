const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const to = require('../utils/to');
const config = require('../config');
const UnknownUser = require('../errors/unknown-user');
const BadPassword = require('../errors/bad-password');
const NotAuthorized = require('../errors/not-authorized');
const BadEmail = require('../errors/bad-email');

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new BadEmail(value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
});

async function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
}

async function createToken() {
  const user = this;
  const payload = { _id: user._id };
  const token = jwt.sign(
    payload,
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN },
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

async function loadUserByCredentials(email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new UnknownUser(email);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new BadPassword();
  }
  return user;
}

async function resolveToken(token) {
  const payload = jwt.verify(token, config.JWT_SECRET);
  const [err, user] = await to(this.find({ _id: payload._id, 'tokens.token': token }));

  if (!user) {
    throw new NotAuthorized({ reason: err }, 'Could not resolve user by token. {{reason}}');
  }

  return payload;
}

schema.pre('save', preSave);
schema.methods.createToken = createToken;
schema.statics.loadUserByCredentials = loadUserByCredentials;
schema.statics.resolveToken = resolveToken;

schema.statics.getSchema = () => Joi.object().keys({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(7),
});

schema.statics.getLoginSchema = () => Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

schema.statics.getRegisterSchema = () => Joi.object().keys({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

const UserModel = mongoose.model('User', schema);

module.exports = UserModel;
