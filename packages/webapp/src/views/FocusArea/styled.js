import styled from 'styled-components';

import { Typography } from '@material-ui/core';

const Wrapper = styled.div`
  background: #fff;
`;

const FooterContainer = styled.div`
  display: flex;
`;

const FooterTitle = styled(Typography)`
&& {
  font-size: 10px;
  font-weight: 700;
  line-height: 140%;
  color: #000;
  text-align: left;
  margin-right: 4px;

  @media screen and (min-width: 600px) {
    font-size: 12px;
  }
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
  FooterContainer,
  FooterTitle,
  FooterDetails
}

export default {
  Wrapper,          
  FooterContainer,
  FooterTitle,
  FooterDetails
}
