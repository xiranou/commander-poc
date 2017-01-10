const Immutable = require('immutable');

function fetchUserPermissionByID(userID) {
  // fetch from Database
  return Immutable.Map({
    userID,
    group: ['atp'],
    type: ['power-user']
  });
}

module.exports = {
  fetchUserPermissionByID
};
