import React from 'react';
import trimValues from '../../helpers/trimValues';
import Icon from '@material-ui/icons/ArrowForward';
import TreeMap from './Treemap';
import SpeedDial from '../SpeedDial';

import {
  Wrapper,
  TreemapWrapper,
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  DateButton,
  DetailsContainer,
  Department,
  Amount,
  PhaseContainer,
  BudgetPhaseButton,
  LinkWrapper,
  ButtonStyle,
  FooterContainer,
  FooterDetails,
  NoticeMessage
 } from './styled';


const callButtonExplore = (selected) => (
  <LinkWrapper href={selected.detail}>
    <ButtonStyle {...{selected}}>
      <span>Explore this department</span>
      <Icon />
    </ButtonStyle>
  </LinkWrapper>
);

const callTreeMap = (eventHandler, selected, latestBudget, totalBudget) => {
  return (
    <React.Fragment>
      <DetailsContainer>
        <div>
          <Department>{selected ? selected.name : `National departments budget`}</Department>
          <Amount>R{selected ? trimValues(selected.amount) : trimValues(totalBudget)}</Amount>
          <PhaseContainer>
            <BudgetPhaseButton>Original Budget</BudgetPhaseButton>
          </PhaseContainer>
        </div>
        {selected ? callButtonExplore(selected) : null}
      </DetailsContainer>
      <TreeMap event={eventHandler} data={latestBudget} />
      <FooterContainer>
        <FooterDetails>Budget data from 1 March 2017 - 28 February 2018</FooterDetails>
        <FooterDetails>Direct charges against the National Revenue Fund are excluded</FooterDetails>
      </FooterContainer>
    </React.Fragment>
  );
};

const callNotice = () => (
  <React.Fragment>
    <NoticeMessage>The data for the provincial budget summary has not been released yet</NoticeMessage>
  </React.Fragment>
);


const Markup = (props) => {

  const {
    eventHandler,
    selected,
    latestBudget,
    totalBudget,
    isNationalBudget,
    modal,
    toggleModal,
  } = props;

  return (
    <Wrapper>
      <TreemapWrapper>
        <BudgetContainer>
          <BudgetHeading>{isNationalBudget ? `National Budget Summary` : `Provincial Budget Summary`}</BudgetHeading>
          <IconAndDates>
            <SpeedDial />
            <div>
              <DateButton>2019-20</DateButton>
            </div>
          </IconAndDates>
        </BudgetContainer>
        {isNationalBudget ? callTreeMap(eventHandler, selected, latestBudget, totalBudget) : callNotice()}
      </TreemapWrapper>
    </Wrapper>
  );
};

export default Markup;
