import React, { Fragment } from 'react';
import { lighten } from 'polished';
import { Tooltip } from '@material-ui/core';

import { Text, TreemapBlock, TreemapBlockWrapper, BlockContent, ResetTooltipDefaultStyling } from './styled';
import TooltipContent from './TooltipContent';
import trimValues from '../../helpers/trimValues';
import { provinces } from './data';

const createInlineText = (title, amount, squarePixels) => (
  <Fragment>
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
          <ResetTooltipDefaultStyling />
          <Tooltip title={<TooltipContent {...{ amount }} name={fullName} />} placement="top" classes={{ tooltip: 'treemapBlockTooltipOverride' }}>
            <BlockContent>
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
            </BlockContent>
          </Tooltip>
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
      <ResetTooltipDefaultStyling />
      <Tooltip title={<TooltipContent {...{ amount, name }} />} placement="top" classes={{ tooltip: 'treemapBlockTooltipOverride' }}>
        <BlockContent>
          <TreemapBlock
            {...{ color, zoom }}
            selected={!children && selected && selected === id}
            onClick={() => changeSelectedHandler({ id, name, color, value: amount, url, zoom })}
          >
            {width > 60 && squarePixels > 6000 && createInlineText(name, amount, squarePixels)}
          </TreemapBlock>
        </BlockContent>
      </Tooltip>
    </TreemapBlockWrapper>
  );
};

export default Block;
