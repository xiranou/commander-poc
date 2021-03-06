const setupCommander = require('./src/commander');

const Chat = require('./src/modules/chat');
const Parser = require('./src/modules/parser');
const Auth = require('./src/modules/auth');
const Modules = {
  Auth,
  Chat,
  Parser
};

const slackPayload = {
  userID: '@UUUU',
  roomID: '@RRRR',
  message: '@cns deploy ci',
  type: 'slack'
};

const commander = setupCommander(Modules);
commander.recieveNewPayload(slackPayload);
