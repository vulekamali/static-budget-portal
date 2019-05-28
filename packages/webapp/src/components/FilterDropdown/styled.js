import styled from 'styled-components';

import { Select, CircularProgress } from '@material-ui/core';

const SelectPreview = styled(Select)`
  && {
    width: ${({ primary }) => (primary ? '100%' : null)};
    background: ${({ primary }) => (primary ? null : '#d8d8d8')};

    & .icon {
      color: #000;
      color: ${({ disabled }) => (disabled ? 'rgba(0, 0, 0, 0.26)' : '#000')};
      background-color: #d7d7d7;
      height: 100%;
      top: 0;
      width: ${({ primary }) => (primary ? '42px' : null)};
      padding: ${({ primary }) => (primary ? '0 10px' : null)};

      @media screen and (min-width: 600px) {
        width: ${({ primary }) => (primary ? '64px' : null)};
        padding: ${({ primary }) => (primary ? '0 20px' : null)};
      }
    }

    & .selectMenu {
      padding-left: ${({ primary }) => (primary ? '16px' : null)};
      padding-right: ${({ primary }) => (primary ? '50px' : '32px')};
      height: ${({ primary }) => (primary ? '42px' : null)};
      box-sizing: border-box;
      width: ${({ primary }) => (primary ? '100%' : null)};
      font-size: 14px;
      font-weight: ${({ primary }) => (primary ? 900 : 400)};
      line-height: ${({ primary }) => (primary ? '30px' : null)};
      letter-spacing: 0.15px;
      color: #000;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: ${({ primary }) => (primary ? '#fff' : '#d8d8d8')};

      @media screen and (min-width: 600px) {
        height: ${({ primary }) => (primary ? '64px' : null)};
        font-size: ${({ primary }) => (primary ? '24px' : null)};
        line-height: ${({ primary }) => (primary ? '49px' : null)};
        padding-right: ${({ primary }) => (primary ? '80px' : null)};
      }

      @media screen and (min-width: 950px) {
        padding-right: ${({ primary }) => (primary ? null : '56px')};
      }
    }

    & .disabled {
      color: rgba(0, 0, 0, 0.26);
    }

    @media screen and (min-width: 375px) {
      width: ${({ primary }) => (primary ? null : '100%')};
    }

    @media screen and (min-width: 600px) {
      max-width: ${({ primary }) => (primary ? '616px' : null)};
    }

    @media screen and (min-width: 950px) {
      font-size: ${({ primary }) => (primary ? null : '20px')};
      padding: ${({ primary }) => (primary ? null : '10px 16px')};
      width: ${({ primary }) => (primary ? null : 'auto')};
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
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

export { SelectPreview, SpinnerContainer, CircularProgressStyled };

export default {
  SelectPreview,
  SpinnerContainer,
  CircularProgressStyled,
};
