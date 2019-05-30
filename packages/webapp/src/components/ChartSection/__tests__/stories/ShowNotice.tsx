import React from 'react';
import { mockProps, Tprops, mockNotice } from '../../schema';
import ChartSection from '../..';

const passedProps: Tprops = {
  ...mockProps(),
  loading: false,
  notices: [1, 2, 3].map(mockNotice),
};

const Test = () => <ChartSection {...passedProps} />;

export default Test;
