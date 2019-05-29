import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../schema';
import ContentFilterDropdown from '../';

const passedProps: TpresentationProps = {
  ...mockPresentationprops(),
  primary: false,
  loading: false,
};

const Test = () => <ContentFilterDropdown {...passedProps} />;

export default Test;
