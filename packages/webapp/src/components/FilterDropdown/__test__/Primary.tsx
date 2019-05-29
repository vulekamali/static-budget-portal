import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../schema';
import FilterDropdown from '../';

const passedProps: TpresentationProps = {
  ...mockPresentationprops(),
  primary: true,
  loading: false,
};

const Test = () => <FilterDropdown {...passedProps} />;

export default Test;
