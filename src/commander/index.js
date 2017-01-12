const co = require('co');

module.exports = class Commander {
  constructor(props) {
    const { auth, parsers, chat, handlers } = props;
    this.auth = auth;
    this.parsers = parsers;
    this.chat = chat;
    this.handlers = handlers;

    this.run = this.run.bind(this);
  }

  run(payload) {
    return co(() => this._run(payload));
  }

  *_run(payload) {
    const parsedPayload = this.getParsedPayload(payload);
    const userID = parsedPayload.get('userID');
    const roomID = parsedPayload.get('roomID');

    this.chat.say(userID, roomID, { message: 'fetching user permission...' });

    const commandMeta = yield this.fetchAndMergePermission(parsedPayload);

    this.chat.say(userID, roomID, { message: 'command in progress...' });

    const meta = yield this.runHandler(commandMeta);
    const message = meta.success ? 'command is successful' : 'command failed';

    this.chat.say(userID, roomID, { message });
  }

  getParsedPayload(payload) {
    const { type } = payload;
    return this.parsers[type].parse(payload);
  }

  *fetchAndMergePermission(parsedPayload) {
    const permission = yield this.auth.fetchUserPermissionByID(parsedPayload.get('userID'));
    return parsedPayload.merge(permission);
  }

  *runHandler(commandMeta) {
    const commandType = commandMeta.getIn(['command', 'type']);
    const handler = this.handlers[commandType];
    return yield handler(commandMeta)
  }
}
