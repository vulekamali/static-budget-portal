import React from 'react';

import addRatios from './addRatios';
import Bar from './Bar';

import { Wrapper, BarChartContainer } from './styled';

const Markup = ({ items }) => {
  const itemsWithRatios = addRatios(items);

  return (
    <Wrapper>
      <BarChartContainer>
        {itemsWithRatios.map((props, index) => (
          <Bar {...props} items={items} index={index} />
        ))}
      </BarChartContainer>
    </Wrapper>
  );
};

export default Markup;
