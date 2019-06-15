import React from 'react';
import {
  mockPresentationalProps,
  TpresentationProps,
  mockNationalTreemap,
  mockProvincialTreemap,
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
      options: ['Only one selection'],
    },
  },
};

const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
