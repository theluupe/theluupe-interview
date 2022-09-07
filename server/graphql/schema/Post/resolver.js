function authorData(parent) {
  const { id, email } = parent;
  if (id && email) {
    return {
      id: parent.id,
      email: parent.email,
    };
  }
  return null;
}

module.exports = {
  authorData,
};
