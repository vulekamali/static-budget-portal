import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;
`;

const TextContainer = styled.div`
  margin-bottom: 32px;
  max-width: 1200px;
  width: 100%;

  @media screen and (min-width: 600px) {
    margin-bottom: 48px;
  }
`;

const Description = styled(Typography)`
  && {
    font-size: 14px;
    line-height: 26px;
    color: #000;

    @media screen and (min-width: 600px) {
      font-size: 16px;
    }

    @media screen and (min-width: 850px) {
      font-size: 16px;
      columns: 2;
      column-gap: 60px;

      & > p {
        margin-top: 0;
      }
    }
  }
`;

export {
  TextWrapper,
  TextContainer,
  Description
}

export default {
  TextWrapper,
  TextContainer,
  Description
}
