const Immutable = require('immutable');

function parseSlackPayload(payload) {
  const { user: userID, room: roomID, message } = payload;

  return Immutable.fromJS({
    userID,
    roomID,
    command: {
      type: 'deploy',
      params: ['atp', 'ci']
    }
  });
};

module.exports = {
  slack: {
    parse: parseSlackPayload
  }
}
