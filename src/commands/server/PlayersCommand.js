const BaseCommand = require('../../utils/structures/BaseCommand');
const axios = require('axios');
const { server } = require('../../hooks/useServer');

module.exports = class PlayersCommand extends BaseCommand {
  constructor() {
    super('players', 'server', []);
  }

  async run(client, message, args) {
    if (!server.get(`server_${message.guild.id}`)) {
      return message.channel.send('You need to specify the server IP:PORT');
    }
    try {
      const serverIP = server.get(`server_${message.guild.id}`);
      const { data } = await axios.get(`http://${serverIP}/dynamic.json`);
      const regex = /\[([0-9]+)\]/;
      const queue = data.hostname.match(regex);
      if (queue) {
        return message.channel.send(
          `Players online: ${data.clients}/${data.sv_maxclients} - Queue: ${queue[1]}`
        );
      } else {
        return message.channel.send(
          `Players online: ${data.clients}/${data.sv_maxclients} - Queue: 0`
        );
      }
    } catch (e) {
      console.log(e.message);
      message.channel.send(`Server is offline`, e.message);
    }
  }
};
