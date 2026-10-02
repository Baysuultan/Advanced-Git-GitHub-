function authenticate(username, password) {
  return Boolean(username && password && password.length >= 8);
}

module.exports = { authenticate };
