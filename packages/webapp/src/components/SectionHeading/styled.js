import {
  Typography,
  Select,
} from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;
`;

const BudgetContainer = styled.div`
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  padding-bottom: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 32px;
  }
`;

const BudgetHeadingAndShareIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BudgetHeading = styled(Typography)`
  &&&& {
    font-weight: 700;
    font-size: 18px;
    line-height: 120%;
    color: #000;
    text-transform: Capitalize;
    text-align: left;

    @media screen and (min-width: 600px) {
      white-space: nowrap;
      padding-right: 22px;
      font-size: 32px;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BudgetPhase = styled.div`
  @media screen and (min-width: 600px) {
    margin-right: 24px;
  }
`;


const SelectStyled = styled(Select)`
  && {
    background: #d8d8d8;
    border-radius: 3px;
    padding: 12px 12px 12px 16px;
    font-size: 14px;
    font-weight: 700;
    line-height: 120%;
    color: #000;

    & .selectMenu {
      padding-right: 32px;

      @media screen and (min-width: 600px) {
        padding-right: 56px;
      }
    }

    @media screen and (min-width: 600px) {
      font-size: 20px;
      padding: 10px 16px;
    }
  }
`;


export {
  Wrapper,
  BudgetContainer,
  BudgetHeadingAndShareIcon,
  BudgetHeading,
  FormContainer,
  BudgetPhase,
  SelectStyled,
}

export default {
  Wrapper,
  BudgetContainer,
  BudgetHeadingAndShareIcon,
  BudgetHeading,
  FormContainer,
  BudgetPhase,
  SelectStyled,
}
