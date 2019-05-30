import { maxBy } from 'lodash';

const addSingleRatio = innerMaxBy => ({ title, amount }) => ({
  title,
  amount,
  ratio: (amount / innerMaxBy) * 100,
});

const addRatio = items => {
  const { amount } = maxBy(items, 'amount');
  return items.map(addSingleRatio(amount * 1.33));
};

export default addRatio;
