const sortSingleItem = ({ amount: a }, { amount: b }) => b - a;

const reformatAsArray = items => key => {
  const province = items[key];
  const { children, ...info } = province;

  return {
    ...info,
    children: children.sort(sortSingleItem),
  };
};

const sortItems = items => {
  if (Array.isArray(items)) {
    return items.sort(sortSingleItem);
  }

  const keysArray = Object.keys(items);
  const result = keysArray.map(reformatAsArray(items));
  return result.sort(sortSingleItem);
};

export default sortItems;
