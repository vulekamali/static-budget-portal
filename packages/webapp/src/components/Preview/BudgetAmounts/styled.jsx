import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Roboto, sans-serif;
  justify-content: center;
  margin-right: 16px;
  margin-left: 16px;

  @media screen and (min-width: 550px) {
    padding-right: 48px;
    padding-left: 48px;
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
`;

const Numbers = styled.div`
  display: flex;
  padding-bottom: 36px;

  @media screen and (min-width: 600px) {
    padding-bottom: 64px;
  }
`;

const Budget = styled.div`
  width: 50%;
`;

const IntroMainHeading = styled.h1`
  font-size: 24px;
  line-height: 1.3;
  margin: 0;
  display: flex;
  align-items: center;
  @media screen and (min-width: 600px) {
    font-size: 48px;
  }
`;

const IntroSubHeading = styled.p`
  font-size: 10px;
  margin: 0;
  @media screen and (min-width: 600px) {
    font-size: 20px;
  }
`;

const Percentages = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 66%;
  @media screen and (min-width: 600px) {
    width: 50%;
  }
`;

export { Wrapper, Summary, Numbers, Budget, IntroMainHeading, IntroSubHeading, Percentages };

export default {
  Wrapper,
  Summary,
  Numbers,
  Budget,
};
