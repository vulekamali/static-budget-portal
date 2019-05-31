import React from 'react';
import { mockPresentationalProps, TpresentationProps, mockIntroduction } from '../../schema';
import DepartmentSummary from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationalProps(),
  introduction: {
    ...mockIntroduction(),
    description: null,
  },
};

const Test = () => <DepartmentSummary {...passedProps} />;

export default Test;
