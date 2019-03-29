import React from 'react';
import { Treemap, Tooltip } from 'recharts';
import styled from 'styled-components';

import Block from './Block';
import TooltipContent from './TooltipContent';
import LeftIcon from '@material-ui/icons/ArrowBack';

import {
  TreemapWrapper,
  TreemapButtonStyle,
  TreemapButtonText
 } from './styled';


const createBlock = (fills, changeSelectedHandler, selected) => {
  return props => {
    const passedProps = { ...props, fills, changeSelectedHandler, selected };
    return <Block {...passedProps} />;
  };
};

const Markup = ({ items, changeSelectedHandler, selected, fills, screenWidth, zoomToggleHandler }) => {
  const widthWithPadding = screenWidth - 48;
  const width = widthWithPadding > 1200 ? 1200 : widthWithPadding;

  if (!Array.isArray(items)) {
    return <div>xxxx</div>
  }

  return (
    <TreemapWrapper {...{ width }}>
      <Treemap
        {...{ width }}
        key={width}
        height={650}
        data={items}
        dataKey="amount"
        animationDuration={600}
        tooltip
        isAnimationActive={false}
        content={createBlock(fills, changeSelectedHandler, selected)}
      >
        <Tooltip content={TooltipContent} />
      </Treemap>
      <TreemapButtonStyle onClick={zoomToggleHandler}>
        <LeftIcon />
        <TreemapButtonText component='span'>Provinces</TreemapButtonText>
      </TreemapButtonStyle>
    </TreemapWrapper>
  )
};

export default Markup;
