import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { trimValues } from './helpers';
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
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '100vw',
  }
});

const Wrapper = styled.div`
  @media screen and (min-width: 450px) {
    display: flex;
  }
`;

const DataGroup = styled.div`
  max-width: 272px;
  margin: 0 auto;
  font-family: Lato;
  padding-top: 16px;
  padding-bottom: 16px;

  @media screen and (min-width: 450px) {
    max-width: 419px;
    padding-left: 20px;
  }

  @media screen and (min-width: 850px) {
    padding-left: none;
  }
`;

const SubHeading = styled.div`
  color: #79B443;
  font-weight: 700;
  line-height: 16px;
  font-size: 10px;
  text-align: center;
  letter-spacing: 3px;
  text-transform: Uppercase;
  padding-bottom: 14px;

  @media screen and (min-width: 450px) {
    font-weight: 400;
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
  padding-bottom: 14px;

  @media screen and (min-width: 450px) {
    line-height: normal;
    text-align: left;
  }
`;

const ProgressBarContainer = styled.div`
  padding-bottom: 26px;
`;

const BudgetGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
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
  padding-bottom: 10px;

  @media screen and (min-width: 450px) {
    text-align: left;
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
    padding-bottom: 24px;

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
    margin: 0 auto;
    min-width: 212px;
    border-radius: 30px;
    padding: 16px 20px;
    color: #fff;
    background-color: #79B443;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-transform: none;

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

const MapWrapper = styled.div`
  display: none;

  @media screen and (min-width: 650px) {
     display: block;
  }
`;

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
  } = props;

  return (
    <AnimationWrapper key={id}>
      <Wrapper>
        <MapWrapper>
          <NationalMap active="Eastern Cape" />
        </MapWrapper>
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
            <StyledLink href={link}>
              <StyledButton>
                <span>View in more detail</span>
                <ForwardArrow />
              </StyledButton>
            </StyledLink>
        </DataGroup>
      </Wrapper>
    </AnimationWrapper>
  )
}

const Preview = (props) => {
  return (
    <PoseGroup>
      {createItem(props)}
    </PoseGroup>
  );
}

export default Preview;
