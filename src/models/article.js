const mongoose = require('mongoose');
const validator = require('validator');
const Joi = require('joi');
const BadUrl = require('../errors/bad-url');

const schema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: (value) => {
      if (!validator.isURL(value)) {
        throw new BadUrl(value);
      }
    },
  },
  image: {
    type: String,
    required: true,
    validate: (value) => {
      if (!validator.isURL(value)) {
        throw new BadUrl(value);
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
  },
});

schema.statics.getSchema = () => Joi.object().keys({
  keyword: Joi.string().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  date: Joi.string().required(),
  source: Joi.string().required(),
  link: Joi.string().uri().required(),
  image: Joi.string().uri().required(),
});

module.exports = mongoose.model('Article', schema);
