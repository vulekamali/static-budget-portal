import React from 'react';
import { mockProps, Tprops } from '../../schema';
import ChartSection from '../..';

const passedProps: Tprops = mockProps();

const Test = () => <ChartSection {...passedProps} />;

export default Test;
