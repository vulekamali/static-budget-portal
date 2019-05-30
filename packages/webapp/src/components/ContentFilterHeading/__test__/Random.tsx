import React from 'react';
import { mockPresentationProps, TpresentationProps } from '../schema';
import ContentFilterHeading from '../index';

const passedProps: TpresentationProps = mockPresentationProps();

const Test = () => <ContentFilterHeading {...passedProps} />;

export default Test;
