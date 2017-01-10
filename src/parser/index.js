const Immutable = require('immutable');

function parseSlackPayload(payload) {
  const { user: userID, room: roomID, message } = payload;

  return Immutable.fromJS({
    userID,
    roomID,
    meta: {
      type: 'deploy',
      brand: 'atp',
      environment: 'ci'
    }
  });
};

module.exports = {
  slack: {
    parse: parseSlackPayload
  }
}
