const Immutable = require('immutable');
const reducer = require('./src/redux/reducer');
const createStore = require('./src/redux/create');
const connect = require('./src/redux/connect');
const Modules = require('./src/modules');
const Automator = require('./src/modules/Automator');
const monitor = require('./src/helpers/monitor');

const store = createStore(reducer);

const automator = new Automator(store.dispatch, Immutable.fromJS(store.getState()), Modules);
const unsubscribeFromStore = connect(store, automator.willRecieveState);

monitor.addSubscriber({
  ready: automator.ready,
  callback: automator.actions.recieveNewPayload
});
monitor.start();
