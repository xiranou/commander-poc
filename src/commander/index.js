const co = require('co');

const parser = require('../modules/parser');
const auth = require('../modules/auth');
const chat = require('../modules/chat');

function run(payload) {
  return co(function* _run() {
    const { type: payloadType } = payload;
    const parsedPayload = parser[payloadType].parse(payload);
    const chatContext = { userID, roomID } = parsedPayload.toJS();

    chat.api.say('fetching user permission...', chatContext);

    const permission = yield auth.fetchUserPermissionByID(parsedPayload.get('userID'));
    const runMeta = parsedPayload.merge(permission);

    chat.api.say('command in progress...', chatContext);

    const meta = yield commandHandler(runMeta);
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
