const prefix = new Map();

const setPrefix = (guildID, newPrefix) => {
  if (prefix.get(`prefix_${guildID}`) === newPrefix) {
    return false;
  }
  prefix.set(`prefix_${guildID}`, newPrefix);
  return true;
};

module.exports = { prefix, setPrefix };
