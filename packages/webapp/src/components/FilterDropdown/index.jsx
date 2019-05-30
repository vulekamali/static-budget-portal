import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';

const createCallbackFn = (callback, prop, didMount) => () => {
  if (callback && didMount) {
    callback(prop);
  }
};

const FilterDropdown = props => {
  const { initialSelected, onSelectedChange, ...otherProps } = props;
  const [didMount, setDidMount] = useState(false);
  const [selected, changeSelected] = useState(initialSelected);

  useEffect(() => setDidMount(true), []);
  useEffect(createCallbackFn(onSelectedChange, selected, didMount), [selected]);

  const passedProps = {
    ...otherProps,
    selected,
    changeSelected,
  };

  return <Presentation {...passedProps} />;
};

export default FilterDropdown;
