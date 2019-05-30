import React from 'react';
import { mockPresentationProps, TpresentationProps, mockDropdown, mockButton } from '../schema';
import ContentFilterHeading from '..';

const passedProps: TpresentationProps = {
  ...mockPresentationProps(),
  title: 'National Budget',
  selectionDropdown: {
    ...mockDropdown(),
    primary: true,
    loading: true,
  },
  yearDropdown: {
    ...mockDropdown(),
    primary: false,
    loading: true,
  },
  button: {
    ...mockButton(),
  },
};

const Test = () => <ContentFilterHeading {...passedProps} />;

export default Test;
