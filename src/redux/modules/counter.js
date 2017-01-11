const Immutable = require('immutable');

const { actionCreators: { sendMessage } } = require('./chat');

const initialState = Immutable.Map({
  count: 0
});

const INCREMENT = '@COUNTER/INCREMENT';
const DECREMENT = '@COUNTER/DECREMENT';

// action creators
function increment(amount) {
  return {
    type: INCREMENT,
    amount
  };
}

function decrement(amount) {
  return {
    type: DECREMENT,
    amount
  };
}

// action creator thunks
function increase(amount = 1) {
  return dispatch => dispatch(increment(amount));
}

function decrease(amount = 1) {
  return dispatch => dispatch(decrement(amount));
}

// reducer
function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case INCREMENT:
      return state.update('count', v => v + action.amount);
    case DECREMENT:
      return state.update('count', v => v - action.amount);
    default:
      return state;
  }
}

module.exports = {
  reducer,
  actionCreators: {
    increase,
    decrease
  }
}