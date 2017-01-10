const Immutable = require('immutable');

module.exports = class Auth {
  constructor(props) {
    this.events = props.events;
    this.fetchUserPermissionByID = this.fetchUserPermissionByID.bind(this);

    this._subscriptions = [
      { eventName: 'paylaod-parsed', callback: this.fetchUserPermissionByID }
    ];
  }

  get subscriptions() {
    return this._subscriptions;
  }

  fetchUserPermissionByID(payload) {
    const { userID, roomID } = payload;
    this.events.emit('send-message', {
      userID,
      roomID,
      message: 'fetch user permission'
    });
    // fetch from Database
    setTimeout(() => {
      const permission = Immutable.Map({
        group: ['atp'],
        type: ['power-user']
      });
      const newPayload = Immutable.Map(payload).set('permission', permission).toJS();

      this.events.emit('permission-fetched', newPayload);
    }, 500);
  }
}
