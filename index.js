const events = require('./src/events');
const commander = require('./src/commander');
const auth = require('./src/auth');

events.on('incoming-slack-message', commander.processSlackPayload);
events.on('deploy', commander.run);

const slackPayload = {
  user: '@UUUU',
  room: '@RRRR',
  message: '@cns deploy ci'
};

// from monitor
events.emit('incoming-slack-message', slackPayload);
///////////////////
/// context gap ///
//////////////////
events.emit('deploy', {
  permission: {
    userID: '@UUUU',
    group: ['atp'],
    type: ['power-user']
  },
  command: {
    action: 'deploy',
    brand: 'atp',
    environment: 'ci'
  }
});

events.emit('mookie', { name: 'mookie' });
