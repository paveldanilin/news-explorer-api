const usersRouter = require('express').Router();
const userController = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.get('/users/me', auth, userController.getMe);

module.exports = usersRouter;
