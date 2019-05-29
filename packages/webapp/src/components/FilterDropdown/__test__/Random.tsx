import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../schema';
import FilterDropdown from '../index';

const passedProps: TpresentationProps = mockPresentationprops();

const Test = () => <FilterDropdown {...passedProps} />;

export default Test;
