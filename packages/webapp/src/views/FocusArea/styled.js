import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const Wrapper = styled.div`
  background: #fff;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;
`;

const FooterContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  max-width: 1200px;

  @media screen and (min-width: 600px) {
    margin-bottom: 16px;
  }
`;

const FooterDetails = styled(Typography)`
  && {
    font-size: 10px;
    line-height: 140%;
    color: #000;
    text-align: left;

    @media screen and (min-width: 600px) {
      font-size: 12px;
    }
  }
`;

export {
  Wrapper,
  FooterWrapper,
  FooterContainer,
  FooterDetails
}

export default {
  Wrapper,
  FooterWrapper,           
  FooterContainer,
  FooterDetails
}
