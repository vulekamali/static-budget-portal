const calcTotal = percentage => {
  if (percentage > 1 || parseFloat(percentage) === 0) {
    return percentage.toFixed(0);
  }

  return '< 1';
};

export default calcTotal;
