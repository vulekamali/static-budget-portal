import React from 'react';
import {
  mockPresentationalProps,
  TpresentationProps,
  mockHeading,
  mockDropdown,
} from '../../schema';
import FocusAreaSummary from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationalProps(),
  error: true,
};

const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
