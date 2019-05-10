import React from 'react';
import Item from './Item';
import createWidthConvertor from './createWidthConvertor';
import transformItems from './transformItems';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 6px;
  justify-content: stretch;
  background: #626262;
`;

const Minimap = ({ items, selected, reverse }) => {
  const convertHeightFn = createWidthConvertor(items);
  const transformedItems = transformItems(items);

  return (
    <Wrapper>
      {transformedItems.map(props => <Item {...{ ...props, convertHeightFn, selected, reverse }} key={props.id} />)}
    </Wrapper>
  )
};

export default Minimap;
