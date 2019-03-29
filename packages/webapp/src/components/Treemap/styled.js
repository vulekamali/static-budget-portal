import { createElement } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

const Text = ({ bold, small, ...otherProps }) => {
  const innerComponent = styled.div`
    font-weight: ${bold ? 'bold' : '400'};
    font-size: ${small ? '10px' : '14px'};
    font-family: Roboto, sans-serif;
`;

  return createElement(innerComponent, otherProps);
};

const TreemapBlock = ({ color, selected, ...otherProps }) => {
  const innerComponent = styled.div`
    cursor: pointer;
    word-break: break-word;
    padding: ${selected ? '12px' : '15px'};
    width: 100%;
    height: 100%;
    background: ${color};
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.8);
    border-width: ${selected ? '3px' : '0'};

    &:hover {
      background: ${lighten(0.1, color)};
    }
`;

  return createElement(innerComponent, otherProps);
};

const TreemapBlockWrapper = styled.foreignObject`
  overflow: visible;
`;

const StyledTooltip = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px;
`;

export { Text, TreemapBlock, TreemapBlockWrapper, StyledTooltip };
export default { Text, TreemapBlock, TreemapBlockWrapper, StyledTooltip };