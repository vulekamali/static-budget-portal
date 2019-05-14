import { maxBy } from 'lodash';

const addSingleRatio = innerBaxBy => ({ title, amount }) => ({
  title,
  amount,
  ratio: (amount / innerBaxBy) * 100,
});

const addRatio = items => {
  const max = maxBy(items, 'amount');
  return items.map(addSingleRatio(max.amount * 1.33));
};

export default addRatio;
