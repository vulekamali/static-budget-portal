import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { calcProgress, trimValues } from './helpers';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import NationalMap from '../../components/NationalMap';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import { darken } from 'polished';


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
  ${'' /* display: flex; */}
`;

const ListGroup = styled.div`
  max-width: 272px;
  margin: 0 auto;
  font-family: Lato;
`;
const List = styled.div`
`;

const SubHeading = styled.div`
  color: #79B443;
  font-weight: 700;
  line-height: 16px;
  font-size: 10px;
  text-align: center;
  letter-spacing: 3px;
  text-transform: Uppercase;
`;

const Heading = styled.div`
  font-weight: 700;
  line-height: normal;
  font-size: 22px;
  text-align: center;
  text-transform: Capitalize;
  max-width: 272px;
`;

const Stage = styled.div`
  font-weight: 700;
  line-height: 16px;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.5px
  text-transform: Uppercase;
  color: rgba(0, 0, 0, 0.5);
`;

const BudgetGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BudgetCashflow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CashflowTitle = styled.div`
  font-weight: 700;
  line-height: normal;
  font-size: 10px;
  text-align: center;
  letter-spacing: 0.5px
  text-transform: Uppercase;
  color: #696969;
`;

const Estimation = styled.div`
  font-weight: 700;
  line-height: normal;
  font-size: 18px;
  text-align: center;
`;

const Text = styled(Typography)`
  & {
    font-weight: normal;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
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
        <NationalMap active="Eastern Cape" size="small" />
        <ListGroup>
          <SubHeading >{subheading}</SubHeading>
          <Heading>{heading}</Heading>
          <Stage>{stage}</Stage>
          {calcProgress(stage) && <List><LinearProgress variant="determinate" value={calcProgress(stage)} /></List>}
          <BudgetGroup>
            <BudgetCashflow>
              <CashflowTitle>Total budget</CashflowTitle>
              <Estimation>{`R${trimValues(totalBudget)}`}</Estimation>
            </BudgetCashflow>
            <BudgetCashflow>
              <CashflowTitle>3 Years project budget</CashflowTitle>
              <Estimation>{`R${trimValues(projectedBudget)}`}</Estimation>
            </BudgetCashflow>
          </BudgetGroup>
          <Text>{description}</Text>
          <a href={link}></a>
          <Button></Button>
        </ListGroup>
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
