import React from 'react';
import Presentation from '../../Presentation';
import { TpresentationProps, mockPresentationProps } from '../../schema';

const passedProps: TpresentationProps = mockPresentationProps();
const Test = () => <Presentation {...passedProps} />;
export default Test;
