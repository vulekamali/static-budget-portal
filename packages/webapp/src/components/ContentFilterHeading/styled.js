import styled from 'styled-components';
import { darken } from 'polished';

import { Typography, Button } from '@material-ui/core';
import Arrow from '@material-ui/icons/ArrowForward';

const HeadingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #efefef;
  padding: 16px;
  margin-bottom: 36px;

  @media screen and (min-width: 550px) {
    padding-right: 48px;
    padding-left: 48px;
  }

  @media screen and (min-width: 600px) {
    padding: 64px 48px;
    margin-bottom: 64px;
  }
`;

const HeadingContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
`;

const HeadingText = styled.div`
  width: 100%;
`;

const Title = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    line-height: 120%;
    color: #000;
    margin-bottom: 16px;

    @media screen and (min-width: 600px) {
      font-size: 48px;
      margin-bottom: 24px;
    }
  }
`;

const SelectsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const RightOptions = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 24px;

  @media screen and (min-width: 1200px) {
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-top: 0;
  }
`;

const Link = styled.a`
  text-decoration: none;
  margin-left: 16px;
`;

const ButtonDetails = styled(Button)`
  && {
    width: 100%;
    background: ${({ disabled }) => (disabled ? 'rgba(0, 0, 0, 0.26)' : '#000')};
    color: ${({ disabled }) => (disabled ? 'rgba(0, 0, 0, 0.26)' : '#fff')};
    text-transform: none;
    padding: 10px 13px 9px 16px;

    &:hover {
      background: ${darken(0.1, '#000')};
    }

    @media screen and (min-width: 600px) {
      padding: 20px 16px;
    }
  }
`;

const ButtonText = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: 0.15px;
  white-space: nowrap;

  @media screen and (min-width: 600px) {
    font-size: 20px;
  }
`;

const Details = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: 0.15px;
  white-space: nowrap;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const DetailedAnalysis = styled.span`
  display: none;

  @media screen and (min-width: 600px) {
    display: block;
    font-family: Roboto;
    font-weight: 700;
    font-size: 20px;
    line-height: 120%;
    letter-spacing: 0.15px;
    white-space: nowrap;
  }
`;

const ArrowStyled = styled(Arrow)`
  && {
    padding-left: 13px;
    box-sizing: content-box;
  }
`;

const PrimaryFilter = styled.div`
  @media screen and (min-width: 600px) {
    max-width: ${({ primary }) => (primary ? '616px' : null)};
  }
`;

const SecondaryFilter = styled.div`
  width: auto;
`;

export {
  HeadingWrapper,
  HeadingContainer,
  HeadingText,
  Title,
  SelectsGroup,
  RightOptions,
  Link,
  ButtonDetails,
  ButtonText,
  ArrowStyled,
  Details,
  DetailedAnalysis,
  PrimaryFilter,
  SecondaryFilter,
};

export default {
  HeadingWrapper,
  HeadingContainer,
  HeadingText,
  Title,
  SelectsGroup,
  RightOptions,
  Link,
  ButtonDetails,
  ButtonText,
  ArrowStyled,
  Details,
  DetailedAnalysis,
  PrimaryFilter,
  SecondaryFilter,
};
