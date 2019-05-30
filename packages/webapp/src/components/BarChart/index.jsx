import React from 'react';
import addRatios from './addRatios';
import Presentation from './Presentation';

const BarChart = ({ items }) => {
  const itemsWithRatios = addRatios(items);
  return <Presentation items={itemsWithRatios} />;
};

export default BarChart;
