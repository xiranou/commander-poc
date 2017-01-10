const parser = require('../parser');

function run(payload) {
  const { type: payloadType } = payload;
  const parsedPayload = parser[payloadType].parse(payload);

  console.log(parsedPayload);
}

module.exports = {
  run
};
