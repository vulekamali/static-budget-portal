import React from 'react';
import { mockProps, Tprops, mockProvincialChartInfo } from '../schema';
import FocusArea from '../index';

// When no JSON file is found by the adaptor component.
const passedProps: Tprops = {
  ...mockProps(),
  provincialChartData: {
    ...mockProvincialChartInfo(),
    provinces: null,
  },
};

const Test = () => <FocusArea {...passedProps} />;

export default Test;
