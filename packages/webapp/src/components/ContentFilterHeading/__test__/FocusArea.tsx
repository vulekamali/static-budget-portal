import React from 'react';
import { mockPresentationProps, TpresentationProps, mockDropdown, mockButton } from '../schema';
import ContentFilterHeading from '..';

const passedProps: TpresentationProps = {
  ...mockPresentationProps(),
  title: 'Focus Areas',
  selectionDropdown: {
    ...mockDropdown(),
    primary: true,
    loading: false,
  },
  yearDropdown: {
    ...mockDropdown(),
    primary: false,
    loading: false,
  },
  button: null,
};

const Test = () => <ContentFilterHeading {...passedProps} />;

export default Test;
