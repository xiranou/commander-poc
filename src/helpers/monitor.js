const Immutable = require('immutable');

let subscribers = Immutable.List();
let payloads = Immutable.List([
  {
    user: '@UUUU',
    room: '@RRRR',
    message: '@cns deploy ci'
  },
  {
    user: '@UUUU',
    room: '@RRRR',
    message: '@cns deploy ci'
  },
  {
    user: '@PPPP',
    room: '@RRRR',
    message: '@cns deploy ci'
  }
]);

function addSubscriber(newSubscriber) {
  subscribers = subscribers.push(newSubscriber);
}

function findReadySubscriber() {
  return subscribers.find(s => s.ready, null);
}

function sendPayload(subscriber) {
  subscriber.callback(payloads.last());
}

function popPayloadQueue() {
  payloads = payloads.pop();
}

function start() {
  const subscriber = findReadySubscriber();
  if (subscriber && payloads.size > 0) {
    console.log('\n--- monitor start sending payload ---\n');
    sendPayload(subscriber);
    popPayloadQueue();
    setTimeout(start, 500);
  }
}

module.exports = {
  start,
  addSubscriber
}