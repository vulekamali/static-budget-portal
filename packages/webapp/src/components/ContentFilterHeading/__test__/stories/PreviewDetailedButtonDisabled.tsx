import React from 'react';
import { mockPresentationProps, TpresentationProps, mockDropdown, mockButton } from '../../schema';
import Presentation from '../../Presentation';

const passedProps: TpresentationProps = {
  ...mockPresentationProps(),
  title: 'National Budget',
  button: {
    ...mockButton(),
    url: null,
  },
};

const Test = () => <Presentation {...passedProps} />;

export default Test;
