import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { darken } from 'polished';

import Arrow from '@material-ui/icons/ArrowForward';

const HeadingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;
  background: #f7f7f7;
  padding-top: 80px;
  padding-bottom: 64px;
`;

const HeadingContainer = styled.div`
  width: 100%;
  max-width: 1375px;
  margin-right: 16px;
  margin-left: 16px;
  box-sizing: border-box;
  background: #f7f7f7;
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

    @media screen and (min-width: 600px) {
      font-size: 48px;
    }
  }
`;

const SelectsGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const RightOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const ButtonDetails = styled(Button)`
  && {
    width: 100%;
    background: #000;
    color: #fff;
    text-transform: none;
    padding: 16px 12px 16px 16px;
    margin-left: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 170px;

    &:hover {
      background: ${darken(0.1, '#000')};
    }

    @media screen and (min-width: 600px) {
      max-width: none;
      padding: 24px 16px 24px 24px;
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

const ArrowStyled = styled(Arrow)`
  padding-left: 16px;
`;

export {
  HeadingWrapper,
  HeadingContainer,
  HeadingText,
  Title,
  SelectsGroup,
  RightOptions,
  ButtonDetails,
  ButtonText,
  ArrowStyled
}

export default {
  HeadingWrapper,
  HeadingContainer,
  HeadingText,
  Title,
  SelectsGroup,
  RightOptions,
  ButtonDetails,
  ButtonText,
  ArrowStyled
}
