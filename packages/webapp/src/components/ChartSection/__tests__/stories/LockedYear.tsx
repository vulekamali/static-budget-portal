import React from 'react';
import { mockProps, mockYearsProp, Tprops } from '../../schema';
import ChartSection from '../..';

const passedProps: Tprops = {
  ...mockProps(),
  years: {
    ...mockYearsProp(),
    onChange: null,
  },
};

const Test = () => <ChartSection {...passedProps} />;

export default Test;
