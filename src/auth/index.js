function fetchUserPermissionByID(userID) {
  return {
    userID,
    group: ['atp'],
    type: ['power-user']
  };
}

module.exports = {
  fetchUserPermissionByID
};
