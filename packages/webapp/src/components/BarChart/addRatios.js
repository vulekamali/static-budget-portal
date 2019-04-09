import { maxBy } from 'lodash';

const addSingleRatio = maxBy => ({ title, amount }) => ({
  title,
  amount,
  ratio: amount / maxBy * 100,
});

const addRatio = items => {
  const max = maxBy(items, 'amount');
  return items.map(addSingleRatio((max.amount * 1.5)))
};

export default addRatio;
