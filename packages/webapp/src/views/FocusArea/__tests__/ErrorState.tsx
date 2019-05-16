import React from 'react';
import { mockProps, Tprops, mockErrors } from '../schema';
import FocusArea from '../index';

// When no JSON file is found by the adaptor component.
const passedProps: Tprops = {
  ...mockProps(),
  adaptorErrors: {
    ...mockErrors(),
    data: true,
  },
};

const Test = () => <FocusArea {...passedProps} />;

export default Test;
