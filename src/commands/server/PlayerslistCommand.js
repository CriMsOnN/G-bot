const BaseCommand = require('../../utils/structures/BaseCommand');
const { server } = require('../../hooks/useServer');
const Discord = require('discord.js');
const axios = require('axios');
const Pagination = require('discord-paginationembed');
module.exports = class PlayerslistCommand extends BaseCommand {
  constructor() {
    super('playerslist', 'server', []);
  }

  async run(client, message, args) {
    if (server.get(`server_${message.guild.id}`)) {
      try {
        const serverIP = server.get(`server_${message.guild.id}`);
        const { data } = await axios.get(`http://${serverIP}/players.json`);
        const embed = new Discord.MessageEmbed();
        const pages = [];
        const playerNames = [];
        const emojiList = ['⏪', '⏩'];
        let playersString = '';
        for (let i = 0; i < data.length; i++) {
          playersString += data[i].name + ', `' + data[i].ping + '`\n';
        }

        playersString = playersString.substring(0, playersString.length - 1);
        embed.addFields({
          name: 'Players ',
          value: playersString,
          inline: true,
        });
        if (playersString.length > 1024) {
          return message.channel.send(
            'Cant send the list of players characters limit exceeded. Use !playersearch name to find a player'
          );
        }
        message.channel.send({ embed: embed });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      return message.channel.send('You need to specify the server ip and port');
    }
  }
};
