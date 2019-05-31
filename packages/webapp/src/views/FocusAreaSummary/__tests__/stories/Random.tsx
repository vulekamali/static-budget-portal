import React from 'react';
import { mockPresentationalProps, TpresentationProps } from '../../schema';
import FocusAreaSummary from '../../Presentation';

const passedProps: TpresentationProps = mockPresentationalProps();
const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
