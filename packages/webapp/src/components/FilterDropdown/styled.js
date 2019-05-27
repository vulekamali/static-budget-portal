import { Typography, Select } from '@material-ui/core';

import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;

  @media screen and (min-width: 375px) {
    width: 100%;
    flex-wrap: wrap;
  }

  @media screen and (min-width: 950px) {
    width: auto;
    flex-wrap: nowrap;
    margin-top: 0;
  }
`;

const BudgetPhase = styled.div`
  @media screen and (min-width: 375px) {
    width: 60%;
  }

  @media screen and (min-width: 950px) {
    margin-right: 24px;
    width: auto;
  }
`;

const SelectStyledPhase = styled(Select)`
  && {
    background: #d8d8d8;
    border-radius: 3px;
    padding: 8px 12px 8px 16px;
    font-size: 14px;
    line-height: 120%;
    color: #000;

    & .selectMenu {
      padding-right: 32px;

      @media screen and (min-width: 950px) {
        padding-right: 56px;
      }
    }

    & .disabled {
      color: rgba(0, 0, 0, 0.26);
    }

    & .icon {
      color: rgba(0, 0, 0, 0.26);
    }

    @media screen and (min-width: 375px) {
      width: 100%;
    }

    @media screen and (min-width: 950px) {
      font-size: 20px;
      padding: 10px 16px;
      width: auto;
    }
  }
`;

const SelectStyled = styled(SelectStyledPhase)`
  && {
    @media screen and (min-width: 375px) {
      width: 35%;
    }

    @media screen and (min-width: 950px) {
      font-size: 20px;
      padding: 10px 16px;
      width: auto;
    }
  }
`;

const SelectPreview = styled(Select)`
  background: #fff;

  && {
    width: 100%;

    @media screen and (min-width: 600px) {
      max-width: 616px;
    }

    & .icon {
      color: #000;
      background-color: #d7d7d7;
      height: 100%;
      top: 0;
      width: 42px;
      padding: 0 10px;

      @media screen and (min-width: 600px) {
        width: 64px;
        padding: 0 20px;
      }
    }

    & .selectMenu {
      padding-left: 16px;
      padding-right: 50px;
      height: 42px;
      box-sizing: border-box;
      width: 100%;
      font-size: 14px;
      font-weight: 900;
      background: #fff;
      line-height: 30px;
      letter-spacing: 0.15px;
      color: #000;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media screen and (min-width: 600px) {
        height: 64px;
        font-size: 24px;
        line-height: 49px;
        padding-right: 80px;
      }
    }
  }
`;

export { FormContainer, BudgetPhase, SelectStyled, SelectStyledPhase, SelectPreview };

export default {
  FormContainer,
  BudgetPhase,
  SelectStyled,
  SelectStyledPhase,
  SelectPreview,
};
