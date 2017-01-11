function fetchPermissionByID(userID) {
  return Promise.resolve({
    userID,
    group: ['atp'],
    type: ['power-user']
  });
}

module.exports = {
  fetchPermissionByID
}