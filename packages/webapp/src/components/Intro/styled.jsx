import styled from 'styled-components';
import Down from '@material-ui/icons/ArrowDropDown';
import Pie from '@material-ui/icons/PieChart';

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
  @media screen and (min-width: 900px) {
    width: 50%;
  }
`;

const IntroMainHeading = styled.h1`
  font-size: 24px;
  line-height: 1.3;
  margin: 0;
  @media screen and (min-width: 900px) {
    font-size: 50px;
  }
`;

const IntroSubHeading = styled.p`
  font-size: 10px;
  margin: 0;
  @media screen and (min-width: 900px) {
    font-size: 20px;
  }
`;

const Percentages = styled.div`
  display: flex;
  @media screen and (min-width: 900px) {
    width: 50%;
  }
`;

const PercentageBlock = styled.div`
  margin: 0 10px;
  @media screen and (min-width: 900px) {
    margin: 0 40px;
  }
`;

const PieIcon = styled(Pie)`
  && {
    font-size: 20px;
    @media screen and (min-width: 900px) {
      font-size: 40px;
    }
  }
`;

const DownIcon = styled(Down)`
  && {
    font-size: 20px;
    @media screen and (min-width: 900px) {
      font-size: 40px;
    }
  }
`;

const Description = styled.div`
   font-size: 14px;
   line-height: 1.7;
   text-align: justify;
   padding: 0 15px;
   
   @media screen and (min-width: 900px) {
     max-width: 60%;
     font-size: 18px;
     padding: 0;
   }
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
  PieIcon,
  DownIcon,
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
  PieIcon,
  DownIcon,
}