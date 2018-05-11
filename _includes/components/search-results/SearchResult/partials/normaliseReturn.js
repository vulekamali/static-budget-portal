import normaliseItem from './normaliseItem.js';


export default function normaliseReturn(returnObj) {
  const { count, results } = returnObj.result;
  return {
    count,
    items: results.map(normaliseItem),
  };
};