import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  position: relative;
  width: ${({ width }) => width}%;
  height: 100%;
  transition: transform 0.3s;
  transform-origin: 0 ${({ reverse }) => reverse ? '100%' : '0'};
  z-index: ${({ active }) => active ? '99999' : '1'};
  border: 2px solid transparent;
  transform: scaleY(${({ active }) => active ? '1.66' : '1'});
  background: ${({ color, active }) => active ? 'black' : color};
`;

const Item = ({ convertHeightFn, selected, id, amount, color, reverse }) => {
  const width = convertHeightFn(amount);
  const active = selected === id;
  return <Block {...{ width, color, active, reverse }} />;
}

export default Item;
