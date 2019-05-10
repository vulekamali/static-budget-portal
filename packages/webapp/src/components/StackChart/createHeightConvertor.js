import { scaleLinear } from 'd3';

const calcMinAndMax = (items) => {
  const extractAmount = ({ amount }) => amount;
  const allAmounts = items.map(extractAmount);
  
  const minVal = Math.min(...allAmounts);
  const maxVal = Math.max(...allAmounts);

  return [minVal, maxVal];
};

const createHeightConvertor = (items) => {
  const maxSize = window.innerHeight * 0.5;
  const [min, max] = calcMinAndMax(items);
  return scaleLinear().domain([min, max]).range([19, maxSize]);
}

export default createHeightConvertor;
