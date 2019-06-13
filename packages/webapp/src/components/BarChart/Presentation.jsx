import React from 'react';
import Bar from './Bar';
import { BarChartContainer } from './styled';

const Presentation = ({ items }) => (
  <BarChartContainer>
    {items.map((props, index) => (
      <Bar {...{ index, items, ...props }} />
    ))}
  </BarChartContainer>
);

export default Presentation;
