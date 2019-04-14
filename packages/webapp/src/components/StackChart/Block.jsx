import React, { Fragment } from 'react';
import { lighten } from 'polished';

import { Text, StackChartBlock, StackChartBlockWrapper } from './styled';
import trimValues from '../../helpers/trimValues';
import { provinces } from './data';

const createInlineText = (title, amount, squarePixels) => (
  <Fragment>
    <Text bold small={squarePixels < 20000}>
      {title}
    </Text>
    <Text small={squarePixels < 20000}>R{trimValues(amount)}</Text>
  </Fragment>
);

const Block = (props) => {
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
    children,
    root,
    zoom,
    hasChildren,
  } = props;

  if (depth === 2) {
    const { 
      index: rootIndex,
      name: rootName,
    } = root;
    const fullName = `${rootName}: ${name}`;

    return (
      <StackChartBlockWrapper {...{ x, y, width, height }} key={id}>
        <div style={{ border: `1px solid ${lighten(0.1, fills[rootIndex])}` }}>
          <StackChartBlock
            onClick={() => changeSelectedHandler({ 
              id,
              name: fullName,
              color: fills[rootIndex],
              value: amount,
              url,
              zoom: rootName,
            })}
          />
        </div>
      </StackChartBlockWrapper>
    )
  }

  if (depth !== 1) {
    return null;
  }

  const squarePixels = width * height;
  const colourIndex = () => provinces.findIndex(province => province === zoom);
  const color = zoom ? fills[colourIndex()] : fills[index];

  return (
    <StackChartBlockWrapper x={x} y={y} width={width} height={height} key={id}>
      <StackChartBlock
        {...{ color, zoom }}
        selected={!children && selected && selected === id}
        onClick={() => changeSelectedHandler({ id, name, color, value: amount, url, zoom })}
      >
        {width > 80 && squarePixels > 10000 && createInlineText(name, amount, squarePixels)}
      </StackChartBlock>
    </StackChartBlockWrapper>
  );
};

export default Block;
