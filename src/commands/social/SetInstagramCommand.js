const { isAdmin } = require('../../auth/administrator');
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { setInstagram } = require('../../hooks/useInstagram');

module.exports = class SetInstagramCommand extends BaseCommand {
  constructor() {
    super('setInstagram', 'social', []);
  }

  run(client, message, args) {
    if (args.length <= 0) return;
    if (!isAdmin(message)) return;
    const embed = new Discord.MessageEmbed();
    embed.setColor('#0099ff');
    embed.setTitle('Instagram Channel');
    embed.setThumbnail('https://i.imgur.com/UlW5AtX.png');
    embed.addFields({
      name: 'Instagram Channel',
      value: args[0],
      inline: true,
    });
    embed.setDescription('Instgram channel updated');
    embed.setFooter(process.env.EMBED_FOOTER);
    const newInstagram = setInstagram(message.guild.id, args[0]);
    if (newInstagram) {
      message.channel.send({ embed: embed });
    } else {
      const embed = new Discord.MessageEmbed();
      embed.setColor('#ff4500');
      embed.setTitle('Instagram Channel');
      embed.setThumbnail('https://i.imgur.com/UlW5AtX.png');
      embed.addFields({
        name: 'Instagram Channel',
        value: args[0],
        inline: true,
      });
      embed.setDescription('Instgram channel couldnt update!');
      embed.setFooter(process.env.EMBED_FOOTER);
      message.channel.send({ embed: embed });
    }
  }
};
