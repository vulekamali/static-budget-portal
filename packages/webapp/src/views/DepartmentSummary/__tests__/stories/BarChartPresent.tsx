import React from 'react';
import {
  mockPresentationalProps,
  TpresentationProps,
  mockProgrammes,
  mockHeading,
} from '../../schema';
import DepartmentSummary from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationalProps(),
  programmes: {
    ...mockProgrammes(),
    chartLoading: false,
    chartNoticeData: null,
  },
};

const Test = () => <DepartmentSummary {...passedProps} />;

export default Test;
