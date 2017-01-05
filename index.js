const events = require('./src/events');
const commander = require('./src/commander');

events.on('deploy', commander.run);
events.on('deploy', () => console.log('I\'m also subscribe to deploy!'));
events.on('mookie', () => console.log('MOOOOKIE'));

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

events.log();