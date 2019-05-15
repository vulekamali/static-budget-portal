import React from 'react';
import { mockProps, Tprops } from '../schema';
import ChartSection from '../index';

const passedProps: Tprops = mockProps();

const Test = () => <ChartSection {...passedProps} />;

export default Test;
