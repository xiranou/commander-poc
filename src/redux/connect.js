const Immutable = require('immutable');

module.exports = function connect(store, onChange) {
  let currentState;

  function handleChange() {
    let nextState = store.getState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(Immutable.fromJS(currentState));
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();

  return unsubscribe;
}
