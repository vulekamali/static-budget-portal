import React from 'react';
import { mockProps, Tprops } from '../schema';
import FocusAreaSummary from '..';

const passedProps: Tprops = mockProps();
const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
