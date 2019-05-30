import styled from 'styled-components';

import { Select, CircularProgress } from '@material-ui/core';

const SelectPreview = styled(Select)`
  && {
    width: 100%;
    background: ${({ primary }) => (primary ? null : '#d8d8d8')};
    padding: ${({ primary }) => (primary ? null : '0 8px')};
    border-radius: 3px;

    & .icon {
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
      height: 42px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: ${({ primary }) => (primary ? 900 : 700)};
      line-height: ${({ primary }) => (primary ? '30px' : null)};
      letter-spacing: 0.15px;
      color: #000;
      border: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: ${({ primary }) => (primary ? '#fff' : '#d8d8d8')};
      display: flex;
      align-items: center;

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

    @media screen and (min-width: 600px) {
      font-size: ${({ primary }) => (primary ? null : '20px')};
      padding: ${({ primary }) => (primary ? null : '10px 16px')};
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
