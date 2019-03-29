import React from 'react';
import { Treemap, Tooltip } from 'recharts';
import styled from 'styled-components';

import Block from './Block';
import TooltipContent from './TooltipContent';
import LeftIcon from '@material-ui/icons/ArrowBack';
import { Button, Typography } from '@material-ui/core';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ButtonStyle = styled(Button)`
  && {
    color: #fff;
    text-transform: none;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    margin-top: 16px;
    margin-right: 16px;
    padding: 12px 16px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const ButtonText = styled(Typography)`
  && {
    padding-left: 20px;
    font-family: Roboto;
    font-weight: 700;
    font-size: 24px;
    color: #fff;
  }
`;

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
    <Wrapper {...{ width }}>
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
      <ButtonStyle onClick={zoomToggleHandler}>
        <LeftIcon />
        <ButtonText component='span'>Provinces</ButtonText>
      </ButtonStyle>
    </Wrapper>
  )
};

export default Markup;
