const Immutable = require('immutable');

const initialState = Immutable.Map({
  messageToSend: null
});

const SEND_MESSAGE = '@CHAT/SEND_MESSAGE';

function sendMessagePayload(payload) {
  return {
    type: SEND_MESSAGE,
    payload
  }
}

function sendMessage(message) {
  return dispatch => dispatch(sendMessagePayload(message));
}

function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case SEND_MESSAGE:
      return state.update('messageToSend', () => action.payload);
    default:
      return state;
  }
}

module.exports = {
  reducer,
  actionCreators: {
    sendMessage
  }
}