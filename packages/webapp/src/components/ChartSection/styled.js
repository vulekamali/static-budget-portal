import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { darken } from 'polished';

const LinkWrapper = styled.a`
  text-decoration: none;
`;

const ButtonStyle = styled(Button)`
  width: 295px;

  && {
    background-color: #ffd54f;
    text-transform: none;
    box-shadow: none;
    min-width: 0;
    font-weight: 700; 
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    &:hover {
      background-color: ${darken(0.1, '#FFD54F')};
    }

    @media screen and (min-width: 450px) {
      font-size: 20px;
      line-height: 65px;
      padding-right: 20px;
      padding-left: 20px;
      margin-top: none;
    }
  }
`;
const DetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding-bottom: 10px;

  @media screen and (min-width: 450px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 35px;
  }
`;

const Department = styled(Typography)`
  && {
    font-size: 20px;
    line-height: 20px;
    color: #000;
    text-transform: Capitalize;

    @media screen and (min-width: 450px) {
      font-size: 24px;
      line-height: 65px;
    }
  }
`;

const Amount = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    line-height: 20px;
    color: #000;

    @media screen and (min-width: 450px) {
      font-size: 50px;
      line-height: 65px;
    }
  }
`;

const PhaseContainer = styled.div`
  margin-top: 20px;
`;

const BudgetPhaseButton = styled.div`
  && {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    letter-spacing: 0.15px;
    color: #000;

    @media screen and (min-width: 450px) {
      font-size: 24px;
    }
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 1200px;

  @media screen and (min-width: 450px) {
    margin-top: 25px;
  }
`;

const FooterDetails = styled(Typography)`
  && {
    font-size: 12px;
    line-height: 24px;
    color: #000;
    text-align: center;

    @media screen and (min-width: 450px) {
      text-align: left;
    }
  }
`;


export {
  DetailsWrapper,
  LinkWrapper,
  ButtonStyle,
  DetailsContainer,
  Department,
  Amount,
  PhaseContainer,
  BudgetPhaseButton,
  FooterWrapper,
  FooterContainer,
  FooterDetails
}

export default {
  DetailsWrapper,
  LinkWrapper,
  ButtonStyle,
  DetailsContainer,
  Department,
  Amount,
  PhaseContainer,
  BudgetPhaseButton,
  FooterWrapper,
  FooterContainer,
  FooterDetails
}
