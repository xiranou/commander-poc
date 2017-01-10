const Immutable = require('immutable');
const events = require('./src/events');
const commander = require('./src/commander');
const auth = require('./src/auth');

const slackPayload = {
  user: '@UUUU',
  room: '@RRRR',
  message: '@cns deploy ci',
  type: 'slack'
};

commander.run(slackPayload);
