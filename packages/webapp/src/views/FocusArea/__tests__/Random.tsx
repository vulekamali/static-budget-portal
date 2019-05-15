import React from 'react';
import { mockProps, Tprops } from '../schema';
import FocusArea from '../index';

const passedProps: Tprops = mockProps();

const Test = () => <FocusArea {...passedProps} />;

export default Test;
