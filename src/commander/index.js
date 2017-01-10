const parser = require('../parser');
const auth = require('../auth');
const chat = require('../chat');

function run(payload) {
  const { type: payloadType } = payload;
  const parsedPayload = parser[payloadType].parse(payload);
  const chatContext = { userID, roomID } = parsedPayload.toJS();

  chat.api.say('fetching user permission...', chatContext);

  auth.fetchUserPermissionByID(parsedPayload.userID).then(permission => {
    const runMeta = parsedPayload.merge(permission);

    chat.api.say('command in progress...', chatContext);

    return commandHandler(runMeta);
  })
  .then(meta => {
    const message = meta.success ? 'command is successful' : 'command is uneventful';

    chat.api.say(message, chatContext);
  });
}

function commandHandler(runMeta) {
  return Promise.resolve({
    success: true
  });
}

module.exports = {
  run
};
