const Immutable = require('immutable');

function fetchUserPermissionByID(userID) {
  // fetch from Database
  return new Promise(resolve => {
    const permission = Immutable.Map({
      userID,
      group: ['atp'],
      type: ['power-user']
    });
    setTimeout(() => resolve(permission), 500);
  });
}

module.exports = {
  fetchUserPermissionByID
};
