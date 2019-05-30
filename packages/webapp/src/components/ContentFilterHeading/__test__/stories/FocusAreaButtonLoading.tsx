import React from 'react';
import { mockPresentationProps, TpresentationProps, mockDropdown, mockButton } from '../../schema';
import Presentation from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationProps(),
  title: 'Focus Areas',
  selectionDropdown: {
    ...mockDropdown(),
    loading: true,
  },
  yearDropdown: {
    ...mockDropdown(),
    loading: true,
  },
  button: null,
};

const Test = () => <Presentation {...passedProps} />;

export default Test;
