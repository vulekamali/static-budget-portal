import React from 'react';

import trimValues from '../../../helpers/trimValues'

import {
  BarChartTotal,
  ColorBar,
  Title,
  Amount,
  Details
 } from './styled';

const createlabel = (title, amount, textNode, labelOutside) => (
  <Details ref={textNode} {...{ labelOutside }}>
    <Title component='div'>{title}</Title>
    <Amount component='div'>{`R${trimValues(amount)}`}</Amount>
  </Details>
);

const callColorBar = (ratio, title, amount, textNode, componentNode, labelOutside) => {
  if (labelOutside) {
    return (
      <React.Fragment>
        <ColorBar ref={componentNode} {...{ ratio }} />
        {createlabel(title, amount, textNode, labelOutside)}
      </React.Fragment>
    );
  }
  return (
    <ColorBar ref={componentNode} {...{ ratio }}>
      {createlabel(title, amount, textNode)}
    </ColorBar>
  );
};

const Bar =  ({ ratio, title, amount, labelOutside, textNode, componentNode }) => {
  return (
    <BarChartTotal key={title}>
      {callColorBar(ratio, title, amount, textNode, componentNode, labelOutside)}
    </BarChartTotal>
  )
};

export default Bar;


// {labelOutside !== null && createlabel(title, amount, textNode)}