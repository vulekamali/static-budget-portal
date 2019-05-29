import React from 'react';
import { mockPresentationprops, TpresentationProps } from '../schema';
import ContentFilterDropdown from '../index';

const passedProps: TpresentationProps = mockPresentationprops();

const Test = () => <ContentFilterDropdown {...passedProps} />;

export default Test;
