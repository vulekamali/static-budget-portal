import React from 'react';
import Bar from './Bar';
import { Wrapper, BarChartContainer } from './styled';

const Markup = ({ items }) => (
  <Wrapper>
    <BarChartContainer>
      {items.map((props, index) => (
        <Bar {...{ index, items, ...props }} />
      ))}
    </BarChartContainer>
  </Wrapper>
);

export default Markup;
