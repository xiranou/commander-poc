const Immutable = require('immutable');

module.exports = class Parser {
  constructor(props) {
    this.events = props.events;
    this.parse = this.parse.bind(this);
    this.parseSlackPayload = this.parseSlackPayload.bind(this);
    this.parsers = {
      slack: this.parseSlackPayload
    };

    this._subscriptions = [
      { eventName: 'new-payload-recieved', callback: this.parse }
    ];
  }

  get subscriptions() {
    return this._subscriptions;
  }

  parseSlackPayload(payload) {
    const { userID, roomID, message, type } = payload;

    const meta = Immutable.fromJS({
      type,
      userID,
      roomID,
      meta: {
        command: {
          type: 'deploy',
          brand: 'atp',
          environment: 'ci'
        }
      }
    }).toJS();

    this.events.emit('paylaod-parsed', meta);
  }

  parse(payload) {
    const { type, userID, roomID } = payload;
    this.events.emit('send-message', {
      userID,
      roomID,
      message: 'parse new message'
    });
    const parser = this.parsers[type];
    return parser ? parser(payload) : null;
  }
}
