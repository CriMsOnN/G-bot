const BaseCommand = require('../../utils/structures/BaseCommand');
const { setPrefix } = require('../../hooks/usePrefix');
const { isAdmin } = require('../../auth/administrator');

module.exports = class SetPrefixCommand extends BaseCommand {
  constructor() {
    super('setPrefix', 'prefix', ['setprefix']);
  }

  run(client, message, args) {
    if (!args.length > 0) return;
    if (!isAdmin(message)) return message.channel.send('Unauthorized');
    const newPrefix = setPrefix(message.guild.id, args[0]);
    if (newPrefix) {
      message.channel.send('Prefix updated!');
      console.log(message.member.roles.cache);
    } else {
      message.channel.send('Prefix couldnt update!');
    }
  }
};
