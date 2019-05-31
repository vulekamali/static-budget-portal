import styled from 'styled-components';

import { Typography, Button } from '@material-ui/core';
import Arrow from '@material-ui/icons/ArrowForward';

const Wrapper = styled.div`
  background: #fff;
`;

const FocusWrapper = styled.div`
  margin-top: 48px;
`;

const FocusLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;

  @media screen and (min-width: 550px) {
    margin-right: 48px;
    margin-left: 48px;
  }
`;

const FocusLinksContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  max-width: 1200px;

  @media screen and (min-width: 600px) {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 16px;
  margin-right: 16px;
`;

const Link = styled.a`
  text-decoration: none;
`;

const ButtonStyled = styled(Button)`
  && {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 16px 24px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

const TextButton = styled(Typography)`
  && {
    color: #000;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.15px;
    text-transform: capitalize;
  }
`;

const ArrowStyled = styled(Arrow)`
  && {
    padding-left: 13px;
    box-sizing: content-box;
  }
`;

export {
  Wrapper,
  FocusWrapper,
  FocusLinksWrapper,
  FocusLinksContainer,
  ButtonContainer,
  Link,
  ButtonStyled,
  TextButton,
  ArrowStyled,
};

export default {
  Wrapper,
  FocusWrapper,
  FocusLinksWrapper,
  FocusLinksContainer,
  ButtonContainer,
  Link,
  ButtonStyled,
  TextButton,
  ArrowStyled,
};
