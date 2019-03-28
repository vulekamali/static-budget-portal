import React from 'react';

import trimValues from '../../../helpers/trimValues'

import {
  BarChartTotal,
  ColorBar,
  Title,
  Amount
 } from './styled';

const createlabel = (title, amount) => (
  <React.Fragment>
    <Title component='div'>{title}</Title>
    <Amount component='div'>{`R${trimValues(amount)}`}</Amount>
  </React.Fragment>
);

const Bar =  ({ ratio, title, amount, labelOutside, htmlNode }) => {
  console.log(ratio)
  return (
    <BarChartTotal key={title}>
      <ColorBar ref={htmlNode} {...{ ratio }}>
        {labelOutside !== null && createlabel(title, amount)}
      </ColorBar>
    </BarChartTotal>
  )
};

export default Bar;