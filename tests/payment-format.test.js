const test = require('node:test');
const assert = require('node:assert/strict');
const { formatPayment } = require('../src/payment-format');

test('formats a payment as currency', () => {
  assert.equal(formatPayment(12.5), '$12.50');
});
