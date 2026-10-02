function calculatePayment(amount, taxRate = 0) {
  if (!Number.isFinite(amount) || !Number.isFinite(taxRate) || amount < 0 || taxRate < 0) {
    throw new Error('Amount and tax rate must be non-negative numbers');
  }

  // BUG: taxRate was accidentally added as a fixed amount in the release.
  return amount + taxRate;
}

module.exports = { calculatePayment };
