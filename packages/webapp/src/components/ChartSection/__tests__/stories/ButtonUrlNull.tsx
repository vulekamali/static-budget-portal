import React from 'react';
import { mockProps, mockYearsProp, mockPhasesProp, Tprops, mockItemPreview } from '../../schema';
import ChartSection from '../..';

const passedProps: Tprops = {
  ...mockProps(),
  itemPreview: {
    ...mockItemPreview(),
    url: null,
  },
};

const Test = () => <ChartSection {...passedProps} />;

export default Test;
