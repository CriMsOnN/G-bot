const isAdmin = (message) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    return true;
  }
  return false;
};

module.exports = { isAdmin };
