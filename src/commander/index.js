function run(permission, commandMeta) {
  console.log('run command...');
}

function processSlackPayload(slackPayload) {
  console.log('process payload from Slack');
  console.log(slackPayload);
}

module.exports = {
  run,
  processSlackPayload
};
