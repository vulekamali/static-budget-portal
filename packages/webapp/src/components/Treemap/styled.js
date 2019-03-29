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

const TreemapBlock = ({ color, selected, zoom, ...otherProps }) => {
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

const TreemapBlockWrapper = styled.foreignObject`
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

const TreemapWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TreemapButtonStyle = styled(Button)`
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

const TreemapButtonText = styled(Typography)`
  && {
    padding-left: 20px;
    font-family: Roboto;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    line-height: 120%;
  }
`;

export {
  Text,
  TreemapBlock,
  TreemapBlockWrapper,
  StyledTooltip,
  TreemapWrapper,
  TreemapButtonStyle,
  TreemapButtonText
};

export default {
  Text,
  TreemapBlock,
  TreemapBlockWrapper,
  StyledTooltip,
  TreemapWrapper,
  TreemapButtonStyle,
  TreemapButtonText
};
