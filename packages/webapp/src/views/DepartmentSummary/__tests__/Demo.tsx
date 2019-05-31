import React from 'react';
import { mockProps, Tprops } from '../schema';
import DepartmentSummary from '../Presentation';

const passedProps: Tprops = mockProps();
const Test = () => <DepartmentSummary {...passedProps} />;

export default Test;
