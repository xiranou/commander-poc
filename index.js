const events = require('./src/events');
const commander = require('./src/commander');
const auth = require('./src/auth');

events.on('deploy', commander.run);
events.on('deploy', () => console.log('I\'m also subscribe to deploy!'));
events.on('deploy', () => console.log('me three'), () => console.log('me four'));

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
