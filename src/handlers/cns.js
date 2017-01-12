const co = require('co');
const validator = require('../modules/validator');

function deploy(commandMeta) {
  const [brand, env] = commandMeta.getIn(['command', 'params']).toJS();

  return co(function* () {
    const isValid = yield validator.validate(brand, env);

    return Promise.resolve({
      success: isValid,
      commandMeta
    });
  });
}

module.exports = {
  deploy
};
