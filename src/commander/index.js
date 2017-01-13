const co = require('co');

module.exports = class Commander {
  constructor(props) {
    const { auth, parsers, chat, validator, handlers } = props;
    this.auth = auth;
    this.parsers = parsers;
    this.chat = chat;
    this.handlers = handlers;
    this.validator = validator;

    this.run = this.run.bind(this);
  }

  get api() {
    const { auth, validator, chat } = this;

    return {
      auth,
      validator,
      chat
    };
  }

  run(payload) {
    return co(() => this._run(payload));
  }

  *_run(payload) {
    const parsedPayload = this.getParsedPayload(payload);
    const userID = parsedPayload.get('userID');
    const roomID = parsedPayload.get('roomID');

    const meta = yield this.runHandler(parsedPayload);
    const message = meta.success ? 'command prcoess successfully finished' : 'command process halted and failed';

    this.chat.say(userID, roomID, { message });
  }

  getParsedPayload(payload) {
    const { type } = payload;
    return this.parsers[type].parse(payload);
  }

  *runHandler(parsedPayload) {
    const commandType = parsedPayload.getIn(['command', 'type']);
    const handler = this.handlers[commandType];
    return yield handler(parsedPayload, this.api);
  }
}
