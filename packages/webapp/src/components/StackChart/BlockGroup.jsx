import React, { Fragment } from 'react';
import Block from './Block';
import styled from 'styled-components';
import trimValues from '../../helpers/trimValues';

const Header = styled.div`
  padding: 30px 0 10px;
  display: flex;
  width: 100%;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-family: Roboto, sans-serif;
  flex-grow: ${({ fullWidth }) => fullWidth ? 1 : 0};
`;

const BlockGroup = ({ name, children, convertHeightFn, amount, selected, htmlRef, headerHtml }) => (
  <div ref={htmlRef}>
    <Header>
      <Text fullWidth>{name}</Text>
      <Text>R{trimValues(amount)}</Text>
    </Header>
    <div>
      {children.map(props => <div key={props.id}><Block {...{ ...props, convertHeightFn, selected }} /></div>)}
    </div>
  </div>
);

export default BlockGroup;
