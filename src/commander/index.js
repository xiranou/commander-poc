const Immutable = require('immutable');
const Optional = require('optional-js');

const events = require('../modules/events');
const handlers = require('./handlers');

function setup(modules) {
  Immutable.fromJS(modules).map(Mod => {
    const module  = new Mod({ events });
    Optional.ofNullable(module.subscriptions)
    .map(subscriptions => subscriptions.map(sub => {
      const { eventName, callback } = sub;
      events.on(eventName, callback);
    }));
  });

  events.on('permission-fetched', run);

  return {
    recieveNewPayload
  }
}

function recieveNewPayload(payload) {
  events.emit('new-payload-recieved', payload);
}

function run(payload) {
  const { userID, roomID } = payload;
  events.emit('send-message', {
    userID,
    roomID,
    message: 'run the command with payload'
  });
  Optional.ofNullable(handlers[payload.type])
  .map(handler => {
    handler(payload).then(commandStatus => {
      events.emit('send-message', {
        userID,
        roomID,
        message: 'command is processed'
      });
    });
  });
}

module.exports = setup;
