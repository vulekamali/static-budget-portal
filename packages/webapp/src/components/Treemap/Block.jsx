import React, { Fragment } from 'react';

import { Text, TreemapBlock, TreemapBlockWrapper } from './styled';
import trimValues from '../../helpers/trimValues';

const createInlineText = (title, amount, squarePixels) => (
  <Fragment>
    <Text bold small={squarePixels < 20000}>
      {title}
    </Text>
    <Text small={squarePixels < 20000}>R{trimValues(amount)}</Text>
  </Fragment>
);

const Block = (props): any => {
  const {
    depth,
    x,
    y,
    id,
    url,
    width,
    height,
    index,
    fills,
    selected,
    name,
    amount,
    changeSelectedHandler,
  } = props;

  if (depth !== 1) {
    return null;
  }

  const squarePixels = width * height;
  const color = fills[index];

  return (
    <TreemapBlockWrapper x={x} y={y} width={width} height={height}>
      <TreemapBlock
        {...{ color }}
        selected={selected && selected.id === id}
        onClick={() => changeSelectedHandler({ id, name, color, value: amount, url })}
      >
        {width > 80 && squarePixels > 10000 && createInlineText(name, amount, squarePixels)}
      </TreemapBlock>
    </TreemapBlockWrapper>
  );
};

export default Block;
