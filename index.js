const commander = require('./src/commander');

const slackPayload = {
  user: '@UUUU',
  room: '@RRRR',
  message: '@cns deploy ci',
  type: 'slack'
};

commander.run(slackPayload);
