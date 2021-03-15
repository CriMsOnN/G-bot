const server = new Map();

const setServer = (guildID, newServer) => {
  if (server.get(`server_${guildID}`) === newServer) {
    return false;
  }

  server.set(`server_${guildID}`, newServer);
  return true;
};

module.exports = { server, setServer };
