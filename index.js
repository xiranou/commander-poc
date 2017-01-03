const events = require('./src/events');
const commander = require('./src/commander');

events.on('deploy', commander);
events.on('deploy', { run: () => console.log('I\' also subscribe to deploy!') });
events.on('mookie', { run: () => console.log('MOOOOKIE') });

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
