import React from 'react';
import Item from './Item';

const Markup = ({ items, convertHeightFn, selected }) => {
  if (!convertHeightFn) {
    return null;
  }

  return (
    <div>
      {items.map(props => <div key={props.id}><Item {...{ ...props, convertHeightFn, selected }} /></div>)}
    </div>
  )
};

export default Markup;
