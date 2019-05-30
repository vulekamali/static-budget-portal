import React from 'react';
import { mockPresentationProps, TpresentationProps } from '../../schema';
import Presentation from '../../Presentation';

const passedProps: TpresentationProps = mockPresentationProps();
const Test = () => <Presentation {...passedProps} />;

export default Test;
