import { Select, CircularProgress } from '@material-ui/core';

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

const SelectPreview = styled(Select)`
  && {
    width: ${({ greyTheme }) => (greyTheme ? null : '100%')};
    background: ${({ greyTheme }) => (greyTheme ? '#d8d8d8' : null)};

    & .icon {
      color: #000;
      background-color: #d7d7d7;
      height: 100%;
      top: 0;
      width: ${({ greyTheme }) => (greyTheme ? null : '42px')};
      padding: ${({ greyTheme }) => (greyTheme ? null : '0 10px')};

      @media screen and (min-width: 600px) {
        width: ${({ greyTheme }) => (greyTheme ? null : '64px')};
        padding: ${({ greyTheme }) => (greyTheme ? null : '0 20px')};
      }
    }

    & .selectMenu {
      padding-left: ${({ greyTheme }) => (greyTheme ? null : '16px')};
      padding-right: ${({ greyTheme }) => (greyTheme ? '32px' : '50px')};
      height: ${({ greyTheme }) => (greyTheme ? null : '42px')};
      box-sizing: border-box;
      width: 100%;
      width: ${({ greyTheme }) => (greyTheme ? null : '100%')};
      font-size: 14px;
      font-weight: ${({ greyTheme }) => (greyTheme ? 400 : 900)};
      line-height: ${({ greyTheme }) => (greyTheme ? null : '30px')};
      letter-spacing: 0.15px;
      color: #000;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: ${({ greyTheme }) => (greyTheme ? '#d8d8d8' : '#fff')};

      @media screen and (min-width: 600px) {
        height: ${({ greyTheme }) => (greyTheme ? null : '64px')};
        font-size: ${({ greyTheme }) => (greyTheme ? null : '24px')};
        line-height: ${({ greyTheme }) => (greyTheme ? null : '49px')};
        padding-right: ${({ greyTheme }) => (greyTheme ? null : '80px')};
      }

      @media screen and (min-width: 950px) {
        padding-right: ${({ greyTheme }) => (greyTheme ? '56px' : null)};
      }
    }

    & .disabled {
      color: rgba(0, 0, 0, 0.26);
    }

    @media screen and (min-width: 375px) {
      width: ${({ greyTheme }) => (greyTheme ? '100%' : null)};
    }

    @media screen and (min-width: 600px) {
      max-width: ${({ greyTheme }) => (greyTheme ? null : '616px')};
    }

    @media screen and (min-width: 950px) {
      font-size: ${({ greyTheme }) => (greyTheme ? '20px' : null)};
      padding: ${({ greyTheme }) => (greyTheme ? '10px 16px' : null)};
      width: ${({ greyTheme }) => (greyTheme ? 'auto' : null)};
    }
  }
`;

const CircularProgressStyled = styled(CircularProgress)`
  && {
    color: rgba(0, 0, 0, 0.4);
    margin-left: 10px;
    position: relative;
    top: 3px;

    @media screen and (min-width: 375px) {
      margin-left: 5px;
    }

    @media screen and (min-width: 450px) {
      margin-left: 20px;
    }
  }
`;

export { FormContainer, SelectPreview, CircularProgressStyled };

export default {
  FormContainer,
  SelectPreview,
  CircularProgressStyled,
};
