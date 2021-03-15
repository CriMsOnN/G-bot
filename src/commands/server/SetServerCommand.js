const BaseCommand = require('../../utils/structures/BaseCommand');
const { server, setServer } = require('../../hooks/useServer');
const { isAdmin } = require('../../auth/administrator');
module.exports = class SetServerCommand extends BaseCommand {
  constructor() {
    super('setServer', 'server', ['setserver', 'ss']);
  }

  run(client, message, args) {
    if (!args.length > 0) return;
    if (!isAdmin(message)) return message.channel.send('Unauthorized');
    if (args[0].indexOf(':') === -1) {
      return message.channel.send(
        'You need to specify the port on server ip (example: 127.0.0.1:30120)'
      );
    }
    const newServer = setServer(message.guild.id, args[0]);
    if (newServer) {
      return message.channel.send('Server IP:PORT has been updated');
    } else {
      return message.channel.send(
        'Could not set the ip and port try again (example: 127.0.0.1:30120)'
      );
    }
  }
};
