import styled from 'styled-components';

import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-right: 16px;
  margin-left: 16px;
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  height: 285px;
  align-items: center;

  @media screen and (min-width: 600px) {
    height: 450px;
  }
`;

const ErrorContainer = styled.div`
  max-width: 285px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px;

  @media screen and (min-width: 600px) {
    max-width: 485px;
    padding: 0;
  }
`;

const ErrorIconStyled = styled(ErrorIcon)`
  && {
    color: #eca03e;
    width: 36px;
    height: 36px;
    margin-bottom: 12px;

    @media screen and (min-width: 600px) {
      width: 48px;
      height: 48px;
      margin-bottom: 24px;
    }
  }
`;

const PrimaryText = styled(Typography)`
  && {
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    color: #000;
    text-align: center;
    margin-bottom: 12px;

    @media screen and (min-width: 600px) {
      font-size: 32px;
      margin-bottom: 24px;
    }
  }
`;

const SecondaryText = styled(Typography)`
  && {
    color: #000;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.15px;
    text-align: center;

    @media screen and (min-width: 600px) {
      font-size: 20px;
    }
  }
`;

export { Wrapper, LayoutContainer, ErrorContainer, ErrorIconStyled, PrimaryText, SecondaryText };

export default {
  Wrapper,
  LayoutContainer,
  ErrorContainer,
  ErrorIconStyled,
  PrimaryText,
  SecondaryText,
};
