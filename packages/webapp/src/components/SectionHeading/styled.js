import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const BudgetContainer = styled.div`
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
  width: 100%;

  @media screen and (min-width: 450px) {
    display: flex;
    justify-content: space-between;
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
    width: 100%;
    padding-bottom: 20px;
    text-align: center;

    @media screen and (min-width: 450px) {
      border-right: 1px solid #000;
      font-size: 32px;
      line-height: 65px;
      text-align: left;
      padding-bottom: 0;
    }
  }
`;

const IconAndDates = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;

  @media screen and (min-width: 450px) {
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

    @media screen and (min-width: 450px) {
      font-size: 24px;
      padding-right: 20px;
      padding-left: 20px;
    }
  }
`;



export {
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  DateButton
}

export default {
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  DateButton
}
