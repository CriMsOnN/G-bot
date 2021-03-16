const instagram = new Map();

const setInstagram = (guildID, newInstagram) => {
  if (instagram.get(`instagram_${guildID}`) === newInstagram) {
    return false;
  }

  instagram.set(`instagram_${guildID}`, newInstagram);
  return true;
};

module.exports = { instagram, setInstagram };
