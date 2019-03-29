import React from 'react';
import { Treemap, Tooltip } from 'recharts';

import Block from './Block';
import TooltipContent from './TooltipContent';

const createBlock = (fills, changeSelectedHandler, selected, zoom) => {
  return props => {
    const passedProps = { ...props, fills, changeSelectedHandler, selected, zoom };
    return <Block {...passedProps} />;
  };
};

const Markup = ({ items, changeSelectedHandler, selected, fills, screenWidth, zoom, hasChildren }) => {
  const widthWithPadding = screenWidth - 48;
  const width = widthWithPadding > 1200 ? 1200 : widthWithPadding;

  return (
    <Treemap
      {...{ width }}
      key={width}
      height={650}
      data={items}
      dataKey="amount"
      animationDuration={600}
      tooltip
      isAnimationActive={false}
      content={createBlock(fills, changeSelectedHandler, selected, zoom, hasChildren)}
    >
      {(!hasChildren || !!zoom) && <Tooltip content={TooltipContent} />}
    </Treemap>
  )
};

export default Markup;
