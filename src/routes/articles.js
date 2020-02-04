const articleRouter = require('express').Router();
const articleController = require('../controllers/articles');
const auth = require('../middlewares/auth');
const schemaValidate = require('../middlewares/schema-validate');
const article = require('../models/article');

articleRouter.get('/articles', auth, articleController.getArticles);
articleRouter.post('/articles', [auth, schemaValidate(article.getSchema())], articleController.createArticle);
articleRouter.delete('/articles/:id', auth, articleController.deleteArticle);

module.exports = articleRouter;
