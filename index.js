const events = require('./src/events');
const commander = require('./src/commander');

events.on('deploy', commander.run);
events.on('deploy', () => console.log('I\'m also subscribe to deploy!'));
events.on('deploy', () => console.log('me three'), () => console.log('me four'));

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

// events.log();
