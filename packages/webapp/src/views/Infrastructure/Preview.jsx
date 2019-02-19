import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import trimValues from '../../helpers/trimValues';
import styled from 'styled-components';
import NationalMap from '../../components/NationalMap';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ForwardArrow from '@material-ui/icons/ArrowForward';
import { darken } from 'polished';
import Progressbar from '../../components/Progressbar';



const AnimationWrapper = posed.div({
  enter: {
    opacity: 1,

  },
  exit: {
    opacity: 0,
  }
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 16px;

  @media screen and (min-width: 650px) {
    flex-direction: row;
    justify-content: space-between;
    ${({ details }) => (!!details ? 'border-bottom: 1px solid #000;' : '')};
    max-width: 976px;
    margin: 0 auto;
    position: relative;
    padding-top: 64px;
  }
`;

const MapWrapper = styled.div`
  display: none;

  @media screen and (min-width: 650px) {
     display: block;
  }
`;

const DataGroup = styled.div`
  max-width: 272px;
  margin: 0 auto;
  font-family: Lato;
  padding-bottom: 16px;

  @media screen and (min-width: 450px) {
    max-width: 419px;
  }
`;

const SubHeading = styled.div`
  color: #79B443;
  font-weight: 900;
  line-height: 16px;
  font-size: 10px;
  text-align: center;
  letter-spacing: 3px;
  text-transform: Uppercase;
  padding-bottom: 8px;

  @media screen and (min-width: 450px) {
    font-weight: 700;
    line-height: normal;
    font-size: 14px;
    text-align: left;
  }
`;

const Heading = styled.div`
  font-weight: 700;
  line-height: normal;
  font-size: 22px;
  text-align: center;
  text-transform: Capitalize;
  max-width: 272px;
  padding-bottom: 24px;

  @media screen and (min-width: 450px) {
    font-size: 32px;
    text-align: left;
    max-width: 419px;
  }
`;

const Stage = styled.div`
  font-weight: 700;
  line-height: 16px;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.5px
  text-transform: Uppercase;
  color: rgba(0, 0, 0, 0.5);
  padding-bottom: 8px;

  @media screen and (min-width: 450px) {
    line-height: normal;
    text-align: left;
    font-weight: 900;
  }
`;

const ProgressBarContainer = styled.div`
  padding-bottom: 24px;
`;

const BudgetGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
`;

const BudgetCashflow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 450px) {
    align-items: flex-start;
  }
`;

const CashflowTitle = styled.div`
  font-weight: 700;
  line-height: normal;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.5px
  text-transform: Uppercase;
  color: #696969;
  padding-bottom: 8px;

  @media screen and (min-width: 450px) {
    text-align: left;
    font-weight: 900;
  }
`;

const Estimation = styled.div`
  font-weight: 700;
  line-height: normal;
  font-size: 18px;
  text-align: center;

  @media screen and (min-width: 450px) {
    font-size: 24px;
    text-align: left;
  }
`;

const Text = styled(Typography)`
  & {
    font-weight: normal;
    line-height: 30px;
    font-size: 14px;
    text-align: center;

    @media screen and (min-width: 450px) {
      line-height: 23px;
      font-size: 16px;
      text-align: left;
      padding-bottom: 32px;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    font-family: Lato;
    margin: 0 auto;
    min-width: 212px;
    border-radius: 30px;
    color: #fff;
    background-color: #79B443;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: none;
    margin-top: 24px;
    padding-right: 20px;
    padding-left: 20px;

    &:hover {
      background: ${darken(0.1, '#79B443')};
    }

    @media screen and (min-width: 450px) {
      margin: 0;
    }
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const SideWrapper = styled.div`
  max-width: 270px;
  margin: 0 auto;
  font-family: Lato; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 48px;
  border-bottom: 1px solid #000;

  @media screen and (min-width: 650px) {
     border-bottom: none;
     margin: 0;
     align-items: flex-start;
  }
`; 

const SideSection = styled.div`
   padding-bottom: 25px;
`;

const SideTitle = styled.div`
   font-weight: 900;
   font-size: 10px;
   line-height: 16px;
   text-align: center;
   letter-spacing: 0.5px;
   text-transform: uppercase;
   color: rgba(0, 0, 0, 0.5);
   padding-bottom: 8px;

  @media screen and (min-width: 650px) {
    text-align: left;
  }
`;

const SideType = styled.div`
   line-height: 20px;
   font-size: 14px;
   text-align: center;
   text-transform: Capitalize;
   color: #000;

  @media screen and (min-width: 650px) {
    text-align: left;
    line-height: 16px;
    font-size: 16px;
  }
`;

const SideLink = styled.a`
  text-decoration: none;
  margin-bottom: 8px;
`;

const SideButton = styled(Button)`
  && {
    font-family: Lato;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-transform: none;
    width: 270px;
    margin: 0 auto;
    font-family: Lato;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0.1px;
    font-weight: normal;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
    padding-left: 16px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    @media screen and (min-width: 650px) {
      width: 190px;
    }
  }
`;

const SideButtonToMaps = styled(Button)`
  && {
    font-family: Lato;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-transform: none;
    width: 270px;
    margin: 0 auto;
    font-family: Lato;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0.1px;
    font-weight: normal;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
    padding-left: 16px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    @media screen and (min-width: 650px) {
      width: 222px;
      position: absolute;
      top: 290px;
      left: 0;
    }
  }
`;

const createSideRender = (id) => (props) => {
  const {
    investment,
    infrastructure,
    department
  } = props;

  return (
    <SideWrapper key={id}>
      <SideSection>
        <SideTitle>Nature of investment:</SideTitle>
        <SideType>{investment}</SideType>
      </SideSection>
      <SideSection>
        <SideTitle>Infrastructure type:</SideTitle>
        <SideType>{infrastructure}</SideType>
      </SideSection>
      <SideSection>
        <SideTitle>Department</SideTitle>
        <SideType>{department}</SideType>
      </SideSection>
      <SideLink href='#'>
        <SideButton>
          <span>Explore this department</span>
          <ForwardArrow />
        </SideButton>
      </SideLink>
      <SideLink href='#'>
        <SideButtonToMaps>
          <span>View project on Google Maps</span>
          <ForwardArrow />
        </SideButtonToMaps>
      </SideLink>
    </SideWrapper>
  );
}
const parseMapProjects = data => data.reduce(
  (result, object) => ({
    ...result,
    [object.id]: object,
  }),
  {},
);

const createItem = (props) => {
  const {
    subheading,
    heading,
    stage,
    totalBudget,
    projectedBudget,
    description,
    id,
    link,
    details
  } = props;

  return (
    <AnimationWrapper key={id}>
      <React.Fragment>
        <DataGroup>
          <SubHeading >{subheading}</SubHeading>
          <Heading>{heading}</Heading>
          <Stage>Project stage: {stage}</Stage>
            <ProgressBarContainer>
              <Progressbar stage={stage} />
            </ProgressBarContainer>
          <BudgetGroup>
            <BudgetCashflow>
              <CashflowTitle>Total budget:</CashflowTitle>
              <Estimation>{`R${trimValues(totalBudget)}`}</Estimation>
            </BudgetCashflow>
            <BudgetCashflow>
              <CashflowTitle>3 Years project budget:</CashflowTitle>
              <Estimation>{`R${trimValues(projectedBudget)}`}</Estimation>
            </BudgetCashflow>
          </BudgetGroup>
          <Text>{description}</Text>
          {!details && (
            <StyledLink href={link}>
              <StyledButton>
                <span>View in more detail</span>
                <ForwardArrow />
              </StyledButton>
            </StyledLink>
          )}
        </DataGroup>
      </React.Fragment>
    </AnimationWrapper>
  );
}



const Preview = (props) => {
  const {
    id,
    sideInfo,
    details,
  } = props;

  return (
    <Wrapper details={details}>
      <MapWrapper>
        <NationalMap size={details ? "medium" : "large"} />
      </MapWrapper>
      <PoseGroup>
        {createItem(props)}
      </PoseGroup>
      {details && sideInfo.map(createSideRender(id))}
    </Wrapper>
  );
}

export default Preview;
