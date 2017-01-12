const validator = require('../modules/validator');

function* deploy(parsedPayload, api = {}) {
  const { auth, validator, chat } = api;
  const userID = parsedPayload.get('userID');
  const roomID = parsedPayload.get('roomID');
  const [brand, env] = parsedPayload.getIn(['command', 'params']).toJS();

  chat.say(userID, roomID, { message: 'validating config...' });

  const validationResult = yield validator.validateConfig(brand, env);

  if (!validationResult.isValid) {
    chat.say(userID, roomID, { message: 'config not valid because...' });
    return {
      success: false,
      meta: {
        reason: 'config not validate',
        validationResult
      }
    };
  }

  chat.say(userID, roomID, { message: 'fetching user permission...' });

  const commandMeta = yield fetchAndMergePermission(auth, parsedPayload);

  chat.say(userID, roomID, { message: 'command in progress...' });

  const success = yield cnsDeploy(commandMeta);

  chat.say(userID, roomID, { message: 'command task done...' });

  return {
    success,
    meta: {}
  };
}

function* fetchAndMergePermission(auth, parsedPayload) {
  const permission = yield auth.fetchUserPermissionByID(parsedPayload.get('userID'));
  return parsedPayload.merge(permission);
}

function cnsDeploy(commandMeta) {
  return Promise.resolve({
    success: true
  });
}

module.exports = {
  deploy
};
