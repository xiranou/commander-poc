const parser = require('../parser');
const auth = require('../auth');

function run(payload, messenger) {
  const { type: payloadType } = payload;
  const parsedPayload = parser[payloadType].parse(payload);
  const permission = auth.fetchUserPermissionByID(parsedPayload.userID);
  const runMeta = parsedPayload.merge(permission);

  commandHandler(runMeta).then(meta => {
    const message = meta.success ? 'command is successful' : 'command is uneventful';
    messenger.sendMessage(message);
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
