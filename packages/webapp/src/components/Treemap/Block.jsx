import React, { Fragment } from 'react';
import { lighten } from 'polished';

import CustomIcon from '../CustomIcon';
import { Text, TreemapBlock, TreemapBlockWrapper } from './styled';
import trimValues from '../../helpers/trimValues';
import { provinces } from './data';

const createIcon = (id) => (
  <div style={{ background: 'black', width: '32px', height: '32px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <CustomIcon type="Test" fontSize="small" />
  </div>
)

const createInlineText = (title, amount, squarePixels, icons, id) => (
  <Fragment>
    {!!icons && squarePixels > 20000 && createIcon(id)}
    <Text bold small={squarePixels < 20000}>
      {(squarePixels < 8000 && title.length > 15)? `${title.substring(0, 15)}...` : title}
    </Text>
    <Text small={squarePixels < 20000}>R{trimValues(amount, true)}</Text>
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
    icons,
  } = props;

  if (depth === 2) {
    const { 
      index: rootIndex,
      name: rootName,
    } = root;
    const fullName = `${rootName}: ${name}`;

    return (
      <TreemapBlockWrapper {...{ x, y, width, height }} key={id}>
        <div style={{ border: `1px solid ${lighten(0.1, fills[rootIndex])}` }}>
          <TreemapBlock
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
      </TreemapBlockWrapper>
    )
  }

  if (depth !== 1) {
    return null;
  }

  const squarePixels = width * height;
  const colourIndex = () => provinces.findIndex(province => province === zoom);
  const color = zoom ? fills[colourIndex()] : fills[index];

  return (
    <TreemapBlockWrapper x={x} y={y} width={width} height={height} key={id}>
      <TreemapBlock
        {...{ color, zoom }}
        selected={!children && selected && selected === id}
        onClick={() => changeSelectedHandler({ id, name, color, value: amount, url, zoom })}
      >
        {width > 60 && squarePixels > 6000 && createInlineText(name, amount, squarePixels, icons, id)}
      </TreemapBlock>
    </TreemapBlockWrapper>
  );
};

export default Block;
