const Optional = require('optional-js');
const Immutable = require('immutable');

let subscriptions = Immutable.Map();
let logger = Immutable.List();

function emit(eventName, payload) {
  logger = logger.push(Immutable.Map({
    eventName,
    payload: Immutable.fromJS(payload)
  }));

  const handlers = subscriptions.get(eventName, null);

  if ( handlers ) {
    handlers.map(cb => cb(payload));
  }
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

function log(flush = true) {
  const logMessage = logger.map(log => `EventName: ${log.get('eventName')}\nPayload: ${log.get('payload')}`).join('\n\n');
  if (flush) logger = Immutable.List();

  console.log(logMessage);
}

module.exports = {
  emit,
  on,
  log,
  subscriptions: getSubscriptions()
};
