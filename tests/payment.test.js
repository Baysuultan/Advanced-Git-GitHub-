const test = require('node:test');
const assert = require('node:assert/strict');
const { calculatePayment } = require('../src/payment');

test('calculates payment including tax', () => {
  assert.ok(Math.abs(calculatePayment(100, 0.12) - 112) < Number.EPSILON);
});

test('rejects invalid payment data', () => {
  assert.throws(() => calculatePayment(-1, 0.12));
});
