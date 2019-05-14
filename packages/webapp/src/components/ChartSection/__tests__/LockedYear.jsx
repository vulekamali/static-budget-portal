import React from 'react';
import { mockProps, mockYearsProp } from '../schema';
import ChartSection from '../index';

const passedProps = {
  ...mockProps(),
  year: {
    ...mockYearsProp(),
    onChange: null,
  },
}

const Test = () => <ChartSection {...passedProps} />;

export default Test;