// mock slack client
const Slack = {
  sendMessage: (message, roomID) => console.log(`sending this message to slack room -> ${roomID}: [${message}]`)
}

module.exports = class Chat {
  constructor(props) {
    this.slack = Slack;
    this.events = props.events;
    this.say = this.say.bind(this);

    this._subscriptions = [
      { eventName: 'send-message', callback: this.say }
    ];
  }

  get subscriptions() {
    return this._subscriptions;
  }

  say(context = {}) {
    const { userID, roomID, message } = context;
    const messageToSend = `${userID} -> ${message}`;

    this.slack.sendMessage(messageToSend, roomID);
  }
}
