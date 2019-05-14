import React from 'react';
import { mockProps, mockYearsProp, mockPhasesProp } from '../schema';
import ChartSection from '../index';

const passedProps = {
  ...mockProps(),
  phases: {
    ...mockPhasesProp(),
    loading: true
  },
  years: {
    ...mockYearsProp(),
    loading: true
  },
}

const Test = () => <ChartSection {...passedProps} />;

export default Test;