const co = require('co');

const parsers = require('../modules/parsers');
const auth = require('../modules/auth');
const chat = require('../modules/chat');

const handlers = require('./handlers');

function run(payload) {
  return co(function* () {
    const { type: payloadType } = payload;
    const parsedPayload = parsers[payloadType].parse(payload);
    const commandType = parsedPayload.getIn(['command', 'type']);
    const handler = handlers[commandType];
    const chatContext = { userID, roomID } = parsedPayload.toJS();

    chat.api.say('fetching user permission...', chatContext);

    const permission = yield auth.fetchUserPermissionByID(parsedPayload.get('userID'));
    const commandMeta = parsedPayload.merge(permission);

    chat.api.say('command in progress...', chatContext);

    const meta = yield handler(commandMeta);
    const message = meta.success ? 'command is successful' : 'command is uneventful';

    chat.api.say(message, chatContext);
  });
}

module.exports = {
  run
};
