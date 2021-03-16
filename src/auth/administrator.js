const isAdmin = (message) => {
  if (message.member.hasPermission('MANAGE_SERVER')) {
    return true;
  }
  return false;
};

module.exports = { isAdmin };
