const Immutable = require('immutable');

const initialState = Immutable.Map({
  commandMeta: null
});
const RECIEVED_NEW_COMMAND = '@COMMANDER/RECIEVED_NEW_COMMAND';

function recievedCommandWithPermission(commandMeta, permission) {
  return {
    type: RECIEVED_NEW_COMMAND,
    payload: commandMeta
  }
}

function run(command, permission) {
  return dispatch => {
    // @TODO:
    // fetch context from redis
    // combine command with context to create meta
    const context = getContext(command);
    const commandMeta = Immutable.fromJS({
      command,
      permission,
      context,
      timeStamp: Date.now()
    });

    dispatch(recievedCommandWithPermission(commandMeta, permission))
  }
}

// mock
function getContext(command) {
  return {};
}

function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case RECIEVED_NEW_COMMAND:
      return state.update('commandMeta', () => action.payload);
    default:
      return state;
  }
}

module.exports = {
  reducer,
  actionCreators: {
    run
  }
}
