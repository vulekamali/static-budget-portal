import coloursList from './coloursList';
import { flatten } from 'lodash';

const buildItem = overrideColor => ({ amount, id, children }, index) => {
  const color = overrideColor || coloursList[index];

  if (children) {
    return children.map(buildItem(color));
  }

  return {
    id,
    amount,
    color,
  }
}

const transformItems = (items) => {
  const result = items.map(buildItem(null));
  return flatten(result);
}


export default transformItems;