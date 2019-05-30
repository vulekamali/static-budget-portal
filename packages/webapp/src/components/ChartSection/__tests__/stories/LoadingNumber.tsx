import React from 'react';
import { mockProps, Tprops } from '../../schema';
import ChartSection from '../..';

const passedProps: Tprops = {
  ...mockProps(),
  loading: 200,
};

const Test = () => <ChartSection {...passedProps} />;

export default Test;
