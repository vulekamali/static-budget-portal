import styled from 'styled-components';

const Wrapper = styled.div`
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
  margin: 0 40px;
`;

const Description = styled.div`
   max-width: 60%;
   font-size: 18px;
   line-height: 1.7;
   text-align: justify;
`;

export {
  Wrapper,
  Summary,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  PercentageBlock,
  Description,
}

export default {
  Wrapper,
  Summary,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  PercentageBlock,
  Description,
}