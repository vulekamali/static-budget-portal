import React from 'react';
import {
  mockPresentationalProps,
  TpresentationProps,
  mockProgrammes,
  mockHeading,
  mockDropdown,
  mockButtonDepartment,
} from '../../schema';
import DepartmentSummary from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationalProps(),
  button: {
    ...mockButtonDepartment(),
    url: 'this-goes-somewhere',
  },
};

const Test = () => <DepartmentSummary {...passedProps} />;

export default Test;
