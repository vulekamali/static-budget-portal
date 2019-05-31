import React from 'react';
import { mockPresentationalProps, TpresentationProps } from '../../schema';
import DepartmentSummary from '../../Presentation';

const passedProps: TpresentationProps = mockPresentationalProps();
const Test = () => <DepartmentSummary {...passedProps} />;

export default Test;
