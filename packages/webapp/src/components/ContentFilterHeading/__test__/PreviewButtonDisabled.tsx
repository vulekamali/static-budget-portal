import React from 'react';
import { mockPresentationProps, TpresentationProps, mockDropdown, mockButton } from '../schema';
import ContentFilterHeading from '..';

const passedProps: TpresentationProps = {
  ...mockPresentationProps(),
  title: 'National Budget',
  selectionDropdown: {
    ...mockDropdown(),
    primary: true,
  },
  yearDropdown: {
    ...mockDropdown(),
    primary: false,
  },
  button: {
    ...mockButton(),
    url: null,
  },
};

const Test = () => <ContentFilterHeading {...passedProps} />;

export default Test;
