const mongoose = require('mongoose');
const config = require('./config');

module.exports.init = async () => {
  await mongoose.connect(config.MONGODB_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
};
