import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
    margin-bottom: 30px;
  }
`;

const BudgetHeading = styled(Typography)`
  &&&& {
    font-weight: 700;
    font-size: 18px;
    line-height: 65px;
    color: #000;
    text-transform: Capitalize;
    text-align: left;

    @media screen and (min-width: 600px) {
      border-right: 1px solid #000;
      line-height: 40px;
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

const SpeedDialStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 20px;

  @media screen and (min-width: 600px) {
    position: static;
    margin-top: 0;
  }
`;


export {
  Wrapper,
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  SpeedDialStyled,
}

export default {
  Wrapper,
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  SpeedDialStyled,
}