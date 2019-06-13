import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
`;

const FooterDetails = styled.div`
  && {
    font-size: 10px;
    color: #000;
    text-align: left;
    font-family: Roboto, sans-serif;
    margin-bottom: 10px;

    p {
      margin: 0;
      line-height: 1;
    }

    @media screen and (min-width: 600px) {
      font-size: 12px;
    }
  }
`;

export { Wrapper, FooterDetails };

export default {
  Wrapper,
  FooterDetails,
};
