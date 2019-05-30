import React from 'react';
import { mockPresentationProps, TpresentationProps, mockDropdown, mockButton } from '../../schema';
import Presentation from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationProps(),
  title: 'National Budget',
  selectionDropdown: {
    ...mockDropdown(),
    loading: false,
  },
  yearDropdown: {
    ...mockDropdown(),
    loading: false,
  },
  button: mockButton(),
};

const Test = () => <Presentation {...passedProps} />;

export default Test;
