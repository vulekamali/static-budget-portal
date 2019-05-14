import React from 'react';
import { mockProps } from '../schema';
import ChartSection from '../index';

const passedProps = mockProps();

const Test = () => <ChartSection {...passedProps} />;

export default Test;