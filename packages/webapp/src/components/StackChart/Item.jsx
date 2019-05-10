import React from 'react';

import Block from './Block';
import BlockGroup from './BlockGroup';

const Item = (props) => {
  if (!props.children) {
    return <Block {...props} root />;
  }

  return <BlockGroup {...props} />
}

export default Item;
