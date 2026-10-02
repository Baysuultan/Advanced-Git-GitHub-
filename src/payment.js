function calculatePayment(amount, taxRate = 0) {
  if (!Number.isFinite(amount) || !Number.isFinite(taxRate) || amount < 0 || taxRate < 0) {
    throw new Error('Amount and tax rate must be non-negative numbers');
  }

  return amount * (1 + taxRate);
}

module.exports = { calculatePayment };
