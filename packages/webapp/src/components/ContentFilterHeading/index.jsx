import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';

const createCallbackFn = (callback, prop, didMount) => () => {
  if (callback && didMount) {
    callback(prop);
  }
};

const FilterDropdown = props => {
  return <Presentation {...props} />;
};

export default FilterDropdown;
