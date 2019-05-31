import React from 'react';
import { mockProps, Tprops, mockPresentationalProps } from '../schema';
import FocusAreaSummary from '..';

console.log(mockPresentationalProps());
const passedProps: Tprops = mockProps();
const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
