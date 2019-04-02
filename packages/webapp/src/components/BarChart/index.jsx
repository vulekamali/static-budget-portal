import React from 'react';
// import pixelWidth from 'string-pixel-width';

import addRatios from './addRatios'
import Bar from './Bar';

import {
  Wrapper,
  BarChartContainer
 } from './styled';

const Markup = ({ items, componentWidth }) => {

  const itemsWithRatios = addRatios(items);

  return (
    <Wrapper>
      <BarChartContainer>
        {itemsWithRatios.map(props => <Bar {...props} />)}
      </BarChartContainer>
    </Wrapper>
  );
};

export default Markup;

// console.log(componentWidth.current.clientWidth);