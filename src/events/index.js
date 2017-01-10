const Optional = require('optional-js');
const Immutable = require('immutable');

let subscriptions = Immutable.Map();

function emit(eventName, payload) {
  const handlers = subscriptions.get(eventName, null);

  if ( handlers ) handlers.map(cb => cb(payload));
}

function on(eventName, ...handlers) {
  const merged = concatHandlers(eventName, handlers);
  subscriptions = subscriptions.set(eventName, merged);
}

function concatHandlers(eventName, handlers) {
  return Optional.ofNullable(subscriptions.get(eventName))
  .map(currentHandlers => currentHandlers.concat(handlers))
  .orElse(Immutable.List(handlers));
}

function getSubscriptions() {
  return subscriptions.toJS();
}

module.exports = {
  emit,
  on,
  subscriptions: getSubscriptions()
};
