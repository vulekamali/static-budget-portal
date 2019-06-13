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
  provincial: {
    ...mockProvincialTreemap(),
    chartLoading: false,
    chartNoticesData: ['Please wait while we fetch the data'],
    chartFooterData: null,
  },
};

const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
