const parser = require('../parser');
const auth = require('../auth');
const chat = require('../chat');

function run(payload) {
  const { type: payloadType } = payload;
  const parsedPayload = parser[payloadType].parse(payload);
  const { userID, roomID } = parsedPayload.toJS();
  const permission = auth.fetchUserPermissionByID(parsedPayload.userID);
  const runMeta = parsedPayload.merge(permission);

  commandHandler(runMeta).then(meta => {
    const message = meta.success ? 'command is successful' : 'command is uneventful';

    chat.api.say(message, { userID, roomID });
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
