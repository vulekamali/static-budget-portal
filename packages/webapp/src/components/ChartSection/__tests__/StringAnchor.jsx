import React from 'react';
import { mockProps, mockAnchor } from '../schema';
import ChartSection from '../index';

const passedProps = {
  ...mockProps(),
  anchor: mockAnchor()
}

const Test = () => <ChartSection {...passedProps} />;

export default Test;