const test = require('node:test');
const assert = require('node:assert/strict');
const { authenticate } = require('../src/auth');

test('accepts a valid user password', () => {
  assert.equal(authenticate('student', 'secure-pass'), true);
});
