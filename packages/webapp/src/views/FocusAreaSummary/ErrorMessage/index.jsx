import React from 'react';

import {
  Wrapper,
  LayoutContainer,
  ErrorContainer,
  ErrorIconStyled,
  PrimaryText,
  SecondaryText,
} from './styled';

const ErrorMessage = () => (
  <Wrapper>
    <LayoutContainer>
      <ErrorContainer>
        <ErrorIconStyled />
        <PrimaryText>Something went wrong while loading this chart data.</PrimaryText>
        <SecondaryText>Please reload the page or try again later.</SecondaryText>
      </ErrorContainer>
    </LayoutContainer>
  </Wrapper>
);

export default ErrorMessage;
