const co = require('co');

module.exports = class Commander {
  constructor(props) {
    this.auth = props.auth;
    this.parsers = props.parsers;
    this.chat = props.chat;
    this.handlers = props.handlers;

    this.run = this.run.bind(this);
  }

  run(payload) {
    return co(() => this._run(payload));
  }

  *_run(payload) {
    const parsedPayload = this.getParsedPayload(payload);
    const chatter = this.getChatter(parsedPayload);

    chatter({ message: 'fetching user permission...' });

    const commandMeta = yield this.fetchAndMergePermission(parsedPayload);

    chatter({ message: 'command in progress...' });

    const meta = yield this.runHandler(commandMeta);
    const message = meta.success ? 'command is successful' : 'command failed';

    chatter({ message });
  }

  getParsedPayload(payload) {
    const { type: payloadType } = payload;
    return this.parsers[payloadType].parse(payload);
  }

  getChatter(parsedPayload) {
    const userID = parsedPayload.get('userID');
    const roomID = parsedPayload.get('roomID');

    return this.chat.say.bind(null, userID, roomID);
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
