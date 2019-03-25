import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BudgetContainer = styled.div`
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;

  @media screen and (min-width: 600px) {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 900px) {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
`;

const BudgetHeading = styled(Typography)`
  &&&& {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #000;
    text-transform: Capitalize;
    padding-bottom: 20px;
    text-align: center;

    @media screen and (min-width: 600px) {
      border-right: 1px solid #000;
      text-align: left;
      line-height: 40px;
      padding-bottom: 0;
      white-space: nowrap;
      padding-right: 36px;
    }

    @media screen and (min-width: 900px) {
      font-size: 32px;
      line-height: 65px;
    }
  }
`;

const IconAndDates = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;

  @media screen and (min-width: 600px) {
    padding-left: 20px;
    padding-bottom: 0;
  }
`;

const DateButton = styled.div`
  && {
    font-family: Roboto;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.15px;
    color: #000;

    @media screen and (min-width: 600px) {
      font-size: 24px;
      padding-right: 20px;
      padding-left: 20px;
    }
  }
`;



export {
  Wrapper,
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  DateButton
}

export default {
  Wrapper,
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  DateButton
}
