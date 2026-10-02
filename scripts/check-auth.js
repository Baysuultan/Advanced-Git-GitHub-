const { authenticate } = require('../src/auth');

if (!authenticate('student', 'secure-pass')) {
  console.error('Authentication regression detected');
  process.exit(1);
}
