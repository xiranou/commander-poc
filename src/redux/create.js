const { createStore: _createStore, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');
const createLogger = require('redux-node-logger');
const logger = createLogger();

const middlewares = [
  thunk,
  // logger
];

module.exports = function createStore(reducer) {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares)(_createStore)
  return createStoreWithMiddlewares(reducer);
}