// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
const BaseEvent = require('../utils/structures/BaseEvent');
const GuildSchema = require('../database/schema/Guild');
module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  async run(client, guild) {
    try {
      const guildConfig = await GuildSchema.create({
        guildId: guild.id,
      });
      client.prefix.set(`prefix_${guild.id}`, guildConfig.get('prefix'));
    } catch (error) {
      console.log(error);
    }
  }
};
