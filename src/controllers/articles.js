const ArticleModel = require('../models/article');
const { commonLogger } = require('../logger');
const locale = require('../i18n');
const ServerError = require('../errors/server-error');
const to = require('../utils/to');

async function createArticle(req, res) {
  const articleData = Object.assign(req.body, { owner: req.user._id });
  const [err, article] = await to(ArticleModel.create(articleData));

  if (!article) {
    throw new ServerError({ reason: err }, 'Could not create user. {{reason}}');
  }

  commonLogger.debug({ requestId: req.requestId, message: 'Article has been created' });

  return res.status(201).send({ id: article._id });
}

async function getArticles(req, res) {
  const [, cards] = await to(ArticleModel.find({ owner: req.user._id }, '-__v -owner'));
  return res.send(cards);
}

async function deleteArticle(req, res) {
  const [err, delResult] = await to(ArticleModel.findOneAndRemove({
    _id: req.params.id,
    owner: req.user._id,
  }));
  if (!delResult) {
    throw new ServerError({ reason: err }, 'Could not delete article {{reason}}');
  }
  res.send({ message: locale.translate('Article has been deleted') });
}

module.exports = {
  createArticle, getArticles, deleteArticle,
};
