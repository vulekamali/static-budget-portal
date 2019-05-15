import React from 'react';
import { mockProps, Tprops, mockYearsProp, mockFocusAreasProp } from '../schema';
import FocusArea from '../index';

// Both charts should be loading and drop downs in header should be loading but showing a selected value.
const passedProps: Tprops = {
  ...mockProps(),
  years: {
    ...mockYearsProp(),
    loading: true,
  },
  focusAreas: {
    ...mockFocusAreasProp(),
    loading: true,
  },
};

const Test = () => <FocusArea {...passedProps} />;

export default Test;
