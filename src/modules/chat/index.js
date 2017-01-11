// mock slack client
const Slack = {
  sendMessage: (message, roomID) => console.log(`sending this message to slack room -> ${roomID}: [${message}]`)
}

function say(context = {}, message) {
  const { userID, roomID } = context;
  const messageToSend = `Hey, ${userID} -> ${message}`;

  Slack.sendMessage(messageToSend, roomID);
}

module.exports = {
  say
};
