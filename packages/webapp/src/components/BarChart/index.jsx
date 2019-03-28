import React from 'react';
import { maxBy } from 'lodash';
import pixelWidth from 'string-pixel-width';

import trimValues from '../../helpers/trimValues'

import {
  Wrapper,
  BarChartContainer,
  BarChartTotal,
  ColorBar,
  RemainderBar,
  Title,
  Amount
 } from './styled';

const callBarChart = (barMax) => ({ title, amount}) => {

  const ratio = (amount / barMax * 100);
  const remainder = 100 - ratio;

  const textWidth = pixelWidth(title);
  console.log(textWidth);

  return (
    <BarChartTotal key={title}>
      <ColorBar {...{ ratio }}>
        <Title component='div'>{title}</Title>
        <Amount component='div'>{`R${trimValues(amount)}`}</Amount>
      </ColorBar>
      <RemainderBar {...{ remainder }}></RemainderBar>
    </BarChartTotal>
  )
};

const BarChart = ({ items }) => {

  const maxAmountObject = maxBy(items, function(max) { return max.amount; });
  const maxAmount = maxAmountObject.amount;
  const barMax = maxAmount + (maxAmount / 2);

  return (
    <Wrapper>
      <BarChartContainer>
        {items.map(callBarChart(barMax))}
      </BarChartContainer>
    </Wrapper>
  );
};

export default BarChart;
