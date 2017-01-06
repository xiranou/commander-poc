const Immutable = require('immutable');
const events = require('./src/events');
const commander = require('./src/commander');
const auth = require('./src/auth');

const slackPayload = {
  user: '@UUUU',
  room: '@RRRR',
  message: '@cns deploy ci'
};


const parsed = parsePayload(slackPayload);

auth.fetchUserPermission(parsed.userID)
.then(permission => {
  commander.run(parsed.command, permission)
  .then(successMessage => chat.sendMessage(successMessage))
  .catch(error => chat.logError(error))
});

