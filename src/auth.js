function authenticate(username, password) {
  return Boolean(username && password && password.length > 20);
}

module.exports = { authenticate };
