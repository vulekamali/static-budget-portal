import { createElement } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

import { Button, Typography } from '@material-ui/core';

const Text = ({ bold, small, ...otherProps }) => {
  const innerComponent = styled.div`
    font-weight: ${bold ? 'bold' : '400'};
    font-size: ${small ? '10px' : '14px'};
    font-family: Roboto, sans-serif;
`;

  return createElement(innerComponent, otherProps);
};

const getWidth = (zoom, selected) => {
  if (selected) {
    return 3;
  }

  if (zoom) {
    return 1;
  }

  return 0;
}

const StackChartBlock = ({ color, selected, zoom, ...otherProps }) => {
  const width = getWidth(zoom, selected);

  const innerComponent = styled.div`
    cursor: pointer;
    word-break: break-word;
    padding: ${15 - width}px;
    width: 100%;
    height: 100%;
    background-color: ${color || 'none'};
    border-style: solid;
    border-color:rgba(255, 255, 255, ${selected ? 0.8 : 0.3});
    border-width: ${width}px;

    &:hover {
      background: ${color ? lighten(0.1, color) : 'rgba(255, 255, 255, 0.2)'};
    }
`;

  return createElement(innerComponent, otherProps);
};

const StackChartBlockWrapper = styled.foreignObject`
  overflow: visible;

  & > div {
    height: 100%;
  }
`;

const StyledTooltip = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px;
`;

const StackChartWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StackChartButtonStyle = styled(Button)`
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

const StackChartButtonText = styled(Typography)`
  && {
    padding-left: 20px;
    font-family: Roboto;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    line-height: 120%;
  }
`;

const Navigator = styled.div`
  width: 100vw;
`;

const FocusItem = styled.div`
  position: absolute;
  top: 25px;
  height: 96px;
  padding: 0 32px;

  left: 0;
  width: calc(100% - 32px);
  background: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: normal;
  color: #000000;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
`;

const StackChartBody = styled.div`
  position: relative;
  padding: 0 16px;
  max-height: calc(100vh - 105px);
  overflow-y: scroll;
  background: white;

  &::-webkit-scrollbar { 
    width: 0 !important 
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: normal;

  .groupLabel {
    font-weight: bold;
    color: #000000;
  }
  .subItemLabel {
    color: rgba(0, 0, 0, 0.4);    
  }
`;

export {
  Text,
  StackChartBlock,
  StackChartBlockWrapper,
  StyledTooltip,
  StackChartWrapper,
  StackChartButtonStyle,
  StackChartButtonText,
  Navigator,
  FocusItem,
  StackChartBody
};

export default {
  Text,
  StackChartBlock,
  StackChartBlockWrapper,
  StyledTooltip,
  StackChartWrapper,
  StackChartButtonStyle,
  StackChartButtonText,
  Navigator,
  FocusItem,
  StackChartBody
};
