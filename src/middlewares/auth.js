const { commonLogger } = require('../logger');
const UserModel = require('../models/user');
const NotAuthorized = require('../errors/not-authorized');

module.exports = async (req, res, next) => {
  if (!req.header('Authorization')) {
    throw new NotAuthorized();
  }
  const token = req.header('Authorization').replace('Bearer ', '');
  req.user = await UserModel.resolveToken(token);
  commonLogger.debug({ requestId: req.requestId, message: 'User has been authorized', user: req.user._id });
  return next();
};
