import React from 'react';
import styled from 'styled-components';
import trimValues from '../../helpers/trimValues';

const Wrapper = styled.div`
  min-height: 19px;
  height: ${({ height }) => height}px;
  border: 1px solid white;
  transition: transform 0.2s;
  transform: translateX(${({ active }) => active ? '4px' : 0});
  background: ${({ color }) => color};
  padding: ${({ isSmall }) => isSmall ? 2 : 10}px 10px;
  display: flex;
  width: 100%;
`;

const Text = styled.div`
  font-size: ${({ isSmall }) => isSmall ? '10' : '12'}px;
  font-weight: bold;
  font-family: Roboto, sans-serif;
  opacity: ${({ active }) => active ? 1 : 0.6 }
  flex-grow: ${({ fullWidth }) => fullWidth ? 1 : 0}
`

const Block = ({ id, name, color, amount, convertHeightFn, htmlRef, selected, children }) => {
  const height = convertHeightFn(amount);
  const isSmall = height < 40;
  const active = selected === id;

  return (
    <Wrapper {...{ color, active, isSmall, height, selected }} ref={htmlRef}>
      <Text fullWidth {...{ active, isSmall }} bold={!!children}>{name}</Text>
      <Text {...{ active, isSmall }} bold={!!children}>R{trimValues(amount, true)}</Text>
    </Wrapper>
  )
}


export default Block;
