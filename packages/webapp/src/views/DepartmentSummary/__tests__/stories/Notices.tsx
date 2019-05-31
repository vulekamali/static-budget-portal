import React from 'react';
import { mockPresentationalProps, TpresentationProps, mockProgrammes } from '../../schema';
import DepartmentSummary from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationalProps(),
  programmes: {
    ...mockProgrammes(),
    chartLoading: false,
    chartNoticeData: ['Please wait while we fetch the data'],
    chartFooterData: null,
  },
};

const Test = () => <DepartmentSummary {...passedProps} />;

export default Test;
