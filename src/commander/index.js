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

    chatter('fetching user permission...');

    const commandMeta = yield this.fetchAndMergePermission(parsedPayload);

    chatter('command in progress...');

    const meta = yield this.runHandler(commandMeta);
    const message = meta.success ? 'command is successful' : 'command is uneventful';

    chatter(message);
  }

  getParsedPayload(payload) {
    const { type: payloadType } = payload;
    return this.parsers[payloadType].parse(payload);
  }

  getChatter(parsedPayload) {
    const chatContext = {
      userID: parsedPayload.get('userID'),
      roomID: parsedPayload.get('roomID')
    };

    return this.chat.say.bind(null, chatContext);
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
