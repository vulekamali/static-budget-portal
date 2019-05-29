import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../schema';
import FilterDropdown from '..';

const passedProps: TpresentationProps = {
  ...mockPresentationprops(),
  primary: true,
  loading: false,
  options: [
    {
      value: 'kids',
      disabled: false,
    },
    {
      value: 'adults',
      disabled: true,
    },
    { value: 'humans', disabled: false },
    { value: 'mamals', disabled: true },
  ],
  selected: 'kids',
};

const Test = () => <FilterDropdown {...passedProps} />;

export default Test;
