const BaseCommand = require('../../utils/structures/BaseCommand');
const { setPrefix, prefix } = require('../../hooks/usePrefix');
const { isAdmin } = require('../../auth/administrator');
const Discord = require('discord.js');
module.exports = class SetPrefixCommand extends BaseCommand {
  constructor() {
    super('setPrefix', 'prefix', ['setprefix']);
  }

  run(client, message, args) {
    if (!args.length > 0) return;
    if (!isAdmin(message)) return message.channel.send('Unauthorized');
    const embed = new Discord.MessageEmbed();
    embed.setColor('#0099ff');
    embed.setTitle('Prefix Update');
    embed.setThumbnail('https://i.imgur.com/UlW5AtX.png');
    embed.addFields(
      {
        name: 'Previous Prefix: ',
        value: prefix.get(`prefix_${message.guild.id}`),
        inline: true,
      },
      { name: 'New Prefix: ', value: args[0], inline: true }
    );
    embed.setDescription('Prefix updated!');
    embed.setFooter(process.env.EMBED_FOOTER);
    const newPrefix = setPrefix(message.guild.id, args[0]);
    if (newPrefix) {
      message.channel.send({ embed: embed });
    } else {
      const embed = new Discord.MessageEmbed();
      embed.setColor('#ff4500');
      embed.setTitle('Prefix Update');
      embed.setThumbnail('https://i.imgur.com/UlW5AtX.png');
      embed.addFields(
        {
          name: 'Previous Prefix: ',
          value: prefix.get(`prefix_${message.guild.id}`),
          inline: true,
        },
        { name: 'New Prefix: ', value: args[0], inline: true }
      );
      embed.setDescription('Prefix couldnt update!');
      embed.setFooter(process.env.EMBED_FOOTER);
      message.channel.send({ embed: embed });
    }
  }
};
