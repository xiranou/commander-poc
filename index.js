const Commander = require('./src/commander');
const handlers = require('./src/handlers');
const parsers = require('./src/modules/parsers');
const auth = require('./src/modules/auth');
const chat = require('./src/modules/chat');

const commander = new Commander({
  handlers,
  parsers,
  auth,
  chat
});

const slackPayload = {
  user: '@UUUU',
  room: '@RRRR',
  message: '@cns deploy ci',
  type: 'slack'
};

commander.run(slackPayload);
