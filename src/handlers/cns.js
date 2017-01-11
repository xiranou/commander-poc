function deploy(commandMeta) {
  return Promise.resolve({
    success: true,
    commandMeta
  });
}

module.exports = {
  deploy
};
