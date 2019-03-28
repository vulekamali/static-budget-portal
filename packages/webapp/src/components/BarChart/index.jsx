import React from 'react';

import {
  Wrapper,
  BarChartContainer,
  BarChartTotal,
  ColorBar,
  RemainderBar
 } from './styled';

const callBarChart = ({ title, amount }) => (
  <BarChartTotal>
    <ColorBar>
      <div>{title}</div>
      <div>{amount}</div>
    </ColorBar>
    <RemainderBar></RemainderBar>
  </BarChartTotal>
);

const BarChart = ({ items }) => {
  return (
    <Wrapper>
      <BarChartContainer>
        {items.map(callBarChart)}
      </BarChartContainer>
    </Wrapper>
  );
};

export default BarChart;
