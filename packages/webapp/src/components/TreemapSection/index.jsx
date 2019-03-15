import React from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import { darken } from 'polished';
import trimValues from '../../helpers/trimValues';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/icons/ArrowForward';
import TreeMap from './Treemap';
import SpeedDial from '../SpeedDial';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;

const TreemapWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const BudgetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
  width: 100%;
`;

const IconAndDates = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  padding-left: 30px;
`;

const BudgetHeading = styled(Typography)`
  border-right: 1px solid #000;

  && {
    font-weight: 700;
    font-size: 32px;
    line-height: 65px;
    color: #000;
    text-transform: Capitalize;
    width: 100%;
    padding-bottom: 30px;
  }
`;

const DateButton = styled(Button)`

  && {
    background-color: rgba(0, 0, 0, 0.1);
    text-transform: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.15px; 
    color: #000;
    padding: 10px 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 35px;
`;

const Department = styled(Typography)`

  && {
    font-size: 24px;
    line-height: 65px;
    color: #000;
    text-transform: Capitalize;
    padding-bottom: 20px;
  }
`;

const Amount = styled(Typography)`

  && {
    font-size: 50px;
    font-weight: 700;
    line-height: 65px;
    color: #000;
  }
`;

const PhaseContainer = styled.div`
  margin-top: 30px;
`;

const BudgetPhaseButton = styled(Button)`

  && {
    background-color: rgba(0, 0, 0, 0.1);
    text-transform: none;
    box-shadow: none;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.15px; 
    color: #000;
    padding: 10px 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const LinkWrapper = styled.a`
  text-decoration: none;
`;

const ButtonStyle = styled(Button)`
  width: 295px;

  && {
    background-color: ${({ selected }) => (selected ? selected.color : null)}
    text-transform: none;
    box-shadow: none;
    min-width: 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 65px;
    text-align: center;
    color: #000;
    padding-right: 20px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: ${darken(0.1, '#E57373')};
    }
  }
`;

const FooterContainer = styled.div`
  margin-top: 25px;
`;

const FooterDetails = styled(Typography)`

  && {
    font-size: 12px;
    line-height: 24px;
    color: #000;
  }
`;

const NoticeMessage = styled(Typography)`

  && {
    font-weight: 700;
    font-size: 32px;
    line-height: 65px;
    color: #666;
    text-transform: Uppercase;
    text-align: center;
  }
`;

const callButtonExplore = (selected) => (
  <LinkWrapper>
    <ButtonStyle {...{selected}}>
      <span>Explore this department</span>
      <Icon />
    </ButtonStyle>
  </LinkWrapper>
);

const callTreeMap = (eventHandler, selected) => (
  <React.Fragment>
    <DetailsContainer>
      <div>
        <Department>{selected ? selected.name : `National departments budget`}</Department>
        <Amount>R{selected ? trimValues(selected.amount) : `Total`}</Amount>
        <PhaseContainer>
          <BudgetPhaseButton onClick={() => console.log('do something')}>Original Budget</BudgetPhaseButton>
        </PhaseContainer>
      </div>
      {selected ? callButtonExplore(selected) : null}
    </DetailsContainer>
    <TreeMap event={eventHandler} />
    <FooterContainer>
      <FooterDetails>Budget data from 1 March 2017 - 28 February 2018</FooterDetails>
      <FooterDetails>Direct charges against the National Revenue Fund are excluded</FooterDetails>
    </FooterContainer>
  </React.Fragment>
);

const callNotice = () => (
  <React.Fragment>
    <NoticeMessage>The data for the provincial budget summary has not been released yet</NoticeMessage>
  </React.Fragment>
);


const Markup = (props) => {

  const { eventHandler, selected, isNationalBudget } = props;

  return (
    <Wrapper>
      <TreemapWrapper>
        <BudgetContainer>
          <BudgetHeading>{isNationalBudget ? `National Budget Summary` : `Provincial Budget Summary`}</BudgetHeading>
          <IconAndDates>
            <SpeedDial />
            <div>
              <DateButton onClick={() => console.log('do something')}>2017-18</DateButton>
            </div>
          </IconAndDates>
        </BudgetContainer>
        {isNationalBudget ? callTreeMap(eventHandler, selected) : callNotice()}
        <p>{JSON.stringify(selected)}</p>
      </TreemapWrapper>
    </Wrapper>
  );
};

export default Markup;
