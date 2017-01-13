const deploy = require('./cns/deploy');

const handlers = {
  [deploy.commandName]: deploy.run
}

module.exports = handlers;
