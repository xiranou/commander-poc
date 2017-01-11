const Immutable = require('immutable');
const Base = require('./Base');
const auth = require('../helpers/auth');

module.exports = class Automator extends Base {
  constructor(dispatch, state, Modules = {}) {
    super(dispatch, state, Modules);

    this.processPayload = this.processPayload.bind(this);
    this.subscribeTo = this.subscribeTo.bind(this);
  }

  get ready() {
    return this.state.getIn(['automator', 'payload']) === null;
  }

  shouldUpdate(currentState, nextState) {
    return !currentState.get('automator').equals(nextState.get('automator'));
  }

  didUpdate() {
    if (this.state.getIn(['automator', 'payload'])) {
      this.processPayload();
    }
  }

  processPayload() {
    const { user: userID, room: roomID, message } = this.state.getIn(['automator', 'payload']);
    const { commander, chat } = this.modules;

    console.log('...new payload recieved');

    console.log('...get user permission with auth');

    auth.fetchPermissionByID(userID).then(permission => {
      console.log('...parse out the command');

      const command = {
        type: 'deploy',
        brand: 'atp',
        environment: 'ci'
      };

      console.log('...calls the commander to run the command');

      commander.messenger = chat.actions;
      return commander.actions.run(command, permission);
    })
    .then(() => {
      console.log('...payload is processed');
      this.actions.clearPayload();
    });
  }

  subscribeTo(monitor) {
    monitor.handlePayload(this.actions.newPayloadRecieved);
  }
}
