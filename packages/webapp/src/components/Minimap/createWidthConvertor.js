import { scaleLinear } from 'd3';

const calcMinAndMax = (items) => {
  const extractAmount = ({ amount }) => amount;
  const allAmounts = items.map(extractAmount);
  
  const minVal = Math.min(...allAmounts);
  const maxVal = Math.max(...allAmounts);

  return [minVal, maxVal];
};

const createWidthConvertor = (items) => {
  const [min, max] = calcMinAndMax(items);
  return scaleLinear().domain([min, max]).range([0, 100]);
}

export default createWidthConvertor;
