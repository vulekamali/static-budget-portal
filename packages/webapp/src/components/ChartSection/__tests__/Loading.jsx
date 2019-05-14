import React from 'react';
import { mockProps } from '../schema';
import ChartSection from '../index';

const passedProps = {
  ...mockProps(),
  loading: true,
}

const Test = () => <ChartSection {...passedProps} />;

export default Test;