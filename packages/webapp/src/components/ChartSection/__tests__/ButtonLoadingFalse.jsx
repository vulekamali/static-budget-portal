import React from 'react';
import { mockProps, mockYearsProp } from '../schema';
import ChartSection from '../index';

const passedProps = {
  ...mockProps(),
  phases: null,
  years: {
    ...mockYearsProp(),
    loading: true
  },
}

const Test = () => <ChartSection {...passedProps} />;

export default Test;