const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  prefix: {
    type: mongoose.SchemaTypes.String,
    required: true,
    default: '!',
  },
  serverIp: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: null,
  },
  defaultRole: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  memberLogChannel: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
});

module.exports = mongoose.model('GuildConfig', GuildSchema);
