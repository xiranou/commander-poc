const Immutable = require('immutable');

const initialState = Immutable.Map({
  payload: null
});

const NEW_PAYLOAD_RECIEVED = '@AUTOMATOR/NEW_PAYLOAD_RECIEVED';
const CLEAR_PAYLOAD = '@AUTOMATOR/CLEAR_PAYLOAD';

function newPayloadRecieved(payload) {
  return {
    type: NEW_PAYLOAD_RECIEVED,
    payload
  };
}

function clearPayload() {
  return {
    type: CLEAR_PAYLOAD,
    payload: null
  };
}

function recieveNewPayload(payload) {
  return dispatch => dispatch(newPayloadRecieved(payload));
}

function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case CLEAR_PAYLOAD:
    case NEW_PAYLOAD_RECIEVED:
      return state.update('payload', () => action.payload);
    default:
      return state;
  }
}

module.exports = {
  reducer,
  actionCreators: {
    recieveNewPayload,
    newPayloadRecieved,
    clearPayload
  }
}
