import React from 'react';
import { mockProps, mockAnchor, Tprops } from '../schema';
import ChartSection from '../index';

const passedProps: Tprops = {
  ...mockProps(),
  anchor: mockAnchor(),
};

const Test = () => <ChartSection {...passedProps} />;

export default Test;
