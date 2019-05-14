import React from 'react';
import { mockProps } from '../schema';
import ChartSection from '../index';

const passedProps = {
  ...mockProps(),
  years: null,
  phases: null,
}

const Test = () => <ChartSection {...passedProps} />;

export default Test;