const Base = require('./Base');

module.exports = class Commander extends Base {
  get messenger() {
    return this._messenger;
  }

  set messenger(m) {
    this._messenger = m
  }

  didUpdate() {
    this.processCommand();
  }

  processCommand() {
    console.log(`Commander: I will process this command with meta: \n${this.state.get('commandMeta')}`);

    this.runHandler().then(this.messenger.sendMessage);
  }

  runHandler(shouldPass = false) {
    const message = 'Command Done!';
    return Promise.resolve(message);
  }
}
