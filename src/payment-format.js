function formatPayment(value) {
  return `$${value.toFixed(2)}`;
}

module.exports = { formatPayment };
