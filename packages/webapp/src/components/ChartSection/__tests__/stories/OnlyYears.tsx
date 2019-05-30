import React from 'react';
import { mockProps, mockYearsProp, Tprops } from '../../schema';
import ChartSection from '../..';

const passedProps: Tprops = {
  ...mockProps(),
  phases: null,
  years: mockYearsProp(),
};

const Test = () => <ChartSection {...passedProps} />;

export default Test;
