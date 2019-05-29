import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../schema';
import FilterDropdown from '..';

const passedProps: TpresentationProps = {
  ...mockPresentationprops(),
  primary: false,
  loading: false,
  options: [{ value: 'kids', disabled: false }],
  selected: 'kids',
};

const Test = () => <FilterDropdown {...passedProps} />;

export default Test;
