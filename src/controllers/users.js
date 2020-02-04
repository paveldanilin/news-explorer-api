const UserModel = require('../models/user');
const { commonLogger } = require('../logger');
const to = require('../utils/to');
const ServerError = require('../errors/server-error');
const UserNotFound = require('../errors/user-not-found');

async function createUser(req, res) {
  const [err, user] = await to(UserModel.create(req.body));

  if (!user) {
    throw new ServerError({ reason: err }, 'Could not create user. {{reason}}');
  }

  try {
    const token = await user.createToken();
    commonLogger.debug({ requestId: req.requestId, message: 'User has been created', user });
    return res.status(201).send({ token });
  } catch (e) {
    throw new ServerError({ reason: e.toString() }, 'Could not create token {{reason}}');
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  let user = null;
  let token = null;

  user = await UserModel.loadUserByCredentials(email, password);

  try {
    token = await user.createToken();
  } catch (e) {
    throw new ServerError({ reason: e.toString() }, 'Could not generate token, {{reason}}');
  }

  commonLogger.debug({ requestId: req.requestId, message: `User ${user.name} has been logged in` });

  return res.send({ token });
}

async function getMe(req, res) {
  const [, user] = await to(
    UserModel.findById(req.user._id, '-password -tokens -_id -__v'),
  );

  if (!user) {
    throw new UserNotFound(req.user._id);
  }

  return res.send(user);
}

module.exports = {
  createUser, login, getMe,
};
