import React from 'react';
import {
  mockPresentationalProps,
  TpresentationProps,
  mockNationalTreemap,
  mockProvincialTreemap,
} from '../../schema';
import FocusAreaSummary from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationalProps(),
  national: {
    ...mockNationalTreemap(),
    chartLoading: false,
  },
  provincial: {
    ...mockProvincialTreemap(),
    chartLoading: false,
  },
};

const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
