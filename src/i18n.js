const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'ru'],
  directory: `${__dirname}/locales`,
});

function translate(phrase, context) {
  // eslint-disable-next-line no-underscore-dangle
  return i18n.__(phrase, context);
}

module.exports = {
  init: i18n.init,
  translate,
};
