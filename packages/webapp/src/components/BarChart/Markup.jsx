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

const callBarChart = (barMax, componentWidth) => ({ title, amount}) => {

  const ratio = (amount / barMax * 100);
  const remainder = 100 - ratio;

  const textWidth = pixelWidth(title);
  // console.log(componentWidth.current.clientWidth);

  return (
    <BarChartTotal key={title}>
      <ColorBar ref={componentWidth} {...{ ratio }}>
        <Title component='div'>{title}</Title>
        <Amount component='div'>{`R${trimValues(amount)}`}</Amount>
      </ColorBar>
      <RemainderBar {...{ remainder }}></RemainderBar>
    </BarChartTotal>
  )
};

const Markup = ({ items, componentWidth }) => {

  const maxAmountObject = maxBy(items, function(max) { return max.amount; });
  const maxAmount = maxAmountObject.amount;
  const barMax = maxAmount + (maxAmount / 2);

  return (
    <Wrapper>
      <BarChartContainer>
        {items.map(callBarChart(barMax, componentWidth))}
      </BarChartContainer>
    </Wrapper>
  );
};

export default Markup;
