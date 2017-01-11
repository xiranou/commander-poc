const Base = require('./Base');

module.exports = class Chat extends Base {
  constructor(dispatch, state) {
    super(dispatch, state);

    this.sendMessageToSlack = this.sendMessageToSlack.bind(this);
  }

  didUpdate(prev, curr) {
    this.sendMessageToSlack()
  }

  sendMessageToSlack() {
    const messageToSend = this.state.get('messageToSend');
    console.log(`Chat: I will send this message to chat: '${messageToSend}'`);
  }
}
