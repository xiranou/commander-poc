// mock slack client
const Slack = {
  sendMessage: (message, roomID) => console.log(`sending this message to slack room -> ${roomID}: [${message}]`)
}

function say(userID, roomID, context = {}) {
  const { message } = context;
  const messageToSend = `Hey, ${userID} -> ${message}`;

  Slack.sendMessage(messageToSend, roomID);
}

module.exports = {
  say
};
