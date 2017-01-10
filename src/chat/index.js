// mock slack client
const Slack = {
  sendMessage: (message, roomID) => console.log(`sending this message to slack room -> ${roomID}: [${message}]`)
}

function say(message, context) {
  const { userID, roomID } = context;
  const messageToSend = `${userID} -> ${message}`;

  Slack.sendMessage(messageToSend, roomID);
}

module.exports = {
  api: {
    say
  }
}
