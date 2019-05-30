import React from 'react';
import { mockPresentationalProps, TpresentationProps } from '../../schema';
import FocusAreaSummary from '../../index.jsx';

const passedProps: TpresentationProps = mockPresentationalProps();
const Test = () => <FocusAreaSummary {...passedProps} />;

export default Test;
