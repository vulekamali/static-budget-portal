import React from 'react';
import { mockProps, Tprops, mockPresentationalProps } from '../schema';
import DepartmentSummary from '..';

console.log(mockPresentationalProps());
const passedProps: Tprops = mockProps();
const Test = () => <DepartmentSummary {...passedProps} />;

export default Test;
