const Optional = require('optional-js');
const Immutable = require('immutable');

let subscriptions = Immutable.Map();

function emit(eventName, payload) {
  const handlers = subscriptions.get(eventName, null);

  if ( handlers ) {
    handlers.map(h => h.run(payload));
  }
}

function on(eventName, handler) {
  const handlers = addHandlers(eventName, handler);
  subscriptions = subscriptions.set(eventName, handlers);
}

function addHandlers(eventName, handler) {
  return Optional.ofNullable(subscriptions.get(eventName))
  .map(currentHandlers => currentHandlers.push(handler))
  .orElse(Immutable.List([handler]));
}

function getSubscriptions() {
  return subscriptions.toJS();
}

module.exports = {
  emit,
  on,
  subscriptions: getSubscriptions()
};
