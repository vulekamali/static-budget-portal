import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';

const createCallbackFn = (callback, prop, didMount) => () => {
  if (callback && didMount) {
    callback(prop);
  }
};

const FilterDropdown = props => {
  const {
    selectionDropdown: {
      initialSelected: selectionSelected,
      onSelectedChange: selectionOnSelectedChange,
      ...otherSelectionDropdownProps
    },
    yearDropdown: {
      initialSelected: yearSelected,
      onSelectedChange: yearOnSelectedChange,
      ...otherYearDropdownProps
    },
    ...otherProps
  } = props;

  const [didMount, setDidMount] = useState(false);
  const [selection, changeSelection] = useState(selectionSelected);
  const [year, changeYear] = useState(yearSelected);

  const selectionDropdown = {
    initialSelected: selection,
    onSelectedChange: changeSelection,
    ...otherSelectionDropdownProps,
  };

  const yearDropdown = {
    initialSelected: year,
    onSelectedChange: changeYear,
    ...otherYearDropdownProps,
  };

  useEffect(() => setDidMount(true), []);
  useEffect(createCallbackFn(selectionOnSelectedChange, selection, didMount), [selection]);
  useEffect(createCallbackFn(yearOnSelectedChange, year, didMount), [year]);

  const passedProps = {
    ...otherProps,
    selectionDropdown,
    yearDropdown,
  };

  console.log(passedProps);

  return <Presentation {...passedProps} />;
};

export default FilterDropdown;
