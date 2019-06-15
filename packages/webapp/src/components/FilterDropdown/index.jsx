import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';

const createCallbackFn = (callback, prop, didMount) => () => {
  if (callback && didMount) {
    callback(prop);
  }
};

const FilterDropdown = props => {
  const { initialSelected, onSelectedChange, options: passedOptions, ...otherProps } = props;
  const [didMount, setDidMount] = useState(false);
  const [selected, changeSelected] = useState(initialSelected);

  useEffect(() => setDidMount(true), []);
  useEffect(createCallbackFn(onSelectedChange, selected, didMount), [selected]);
  const options = passedOptions && passedOptions.length > 1 ? passedOptions : [{ value: selected }];

  const passedProps = {
    ...otherProps,
    options,
    selected,
    changeSelected,
  };

  return <Presentation {...passedProps} />;
};

export default FilterDropdown;
