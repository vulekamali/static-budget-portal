import React from 'react';
import { mockPresentationProps, TpresentationProps, mockDropdown } from '../../schema';
import Presentation from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationProps(),
  title: 'Focus Areas',
  selectionDropdown: {
    ...mockDropdown(),
    loading: false,
  },
  yearDropdown: {
    ...mockDropdown(),
    loading: false,
  },
  button: null,
};

const Test = () => <Presentation {...passedProps} />;

export default Test;
