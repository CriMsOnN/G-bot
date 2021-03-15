const BaseEvent = require('../../utils/structures/BaseEvent');
const GuildSchema = require('../../database/schema/Guild');
const { prefix, setPrefix } = require('../../hooks/usePrefix');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {
    if (message.author.bot) return;
    if (!prefix.get(`prefix_${message.guild.id}`)) {
      const guildConfig = await GuildSchema.findOne({
        guildId: message.guild.id,
      });
      setPrefix(message.guild.id, guildConfig.get('prefix'));
    }
    if (message.content.startsWith(prefix.get(`prefix_${message.guild.id}`))) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(prefix.get(`prefix_${message.guild.id}`).length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
};
