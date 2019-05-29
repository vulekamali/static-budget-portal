import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../schema';
import ContentFilterDropdown from '..';

const passedProps: TpresentationProps = {
  ...mockPresentationprops(),
  primary: true,
  loading: false,
  options: [{ value: 'kids', disabled: false }],
  selected: 'kids',
};

const Test = () => <ContentFilterDropdown {...passedProps} />;

export default Test;
