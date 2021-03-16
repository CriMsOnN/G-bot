const server = new Map();
const GuildSchema = require('../database/schema/Guild');

const setServer = async (guildID, newServer) => {
  if (server.get(`server_${guildID}`) === newServer) {
    return false;
  }

  server.set(`server_${guildID}`, newServer);
  const guildConfig = await GuildSchema.findOneAndUpdate(
    {
      guildId: guildID,
    },
    {
      serverIp: newServer,
    },
    {
      new: true,
    }
  );
  return true;
};

module.exports = { server, setServer };
