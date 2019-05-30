import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../../schema';
import FilterDropdown from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationprops(),
  primary: true,
  loading: true,
};

const Test = () => <FilterDropdown {...passedProps} />;

export default Test;
