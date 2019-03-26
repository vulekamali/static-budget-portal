import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  font-family: Roboto;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 50px 0;
`;

const Budget = styled.div`
  width: 50%;
`;

const IntroMainHeading = styled.h1`
  font-size: 50px;
  line-height: 1.3;
  margin: 0;
`;

const IntroSubHeading = styled.p`
  font-size: 20px;
  margin: 0;
  
`;

const Percentages = styled.div`
  width: 50%;
  display: flex;
`;

const PercentageBlock = styled.div`
  padding: 0 40px;
`;


export {
  Wrapper,
  Summary,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  PercentageBlock,
}

export default {
  Wrapper,
  Summary,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  PercentageBlock,
}