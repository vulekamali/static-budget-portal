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
  heading: {
    ...mockHeading(),
    selectionDropdown: {
      ...mockDropdown(),
      loading: true,
    },
    yearDropdown: {
      ...mockDropdown(),
      loading: true,
    },
  },
};

const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
