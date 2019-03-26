import React from 'react';
import trimValues from '../../helpers/trimValues';
import Icon from '@material-ui/icons/ArrowForward';
import SectionHeading from '../SectionHeading';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  DetailsWrapper,
  LinkWrapper,
  ButtonStyle,
  TextExploreButton,
  DetailsContainer,
  Department,
  Amount,
  // PhaseContainer,
  // BudgetPhaseButton,
  FooterWrapper,
  FooterContainer,
  FooterDetails
 } from './styled';

const callButtonExplore = () => (
  <LinkWrapper href='/'>
    <ButtonStyle>
      <TextExploreButton>Explore</TextExploreButton>
      <Icon />
    </ButtonStyle>
  </LinkWrapper>
);

const Markup = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <SectionHeading title='National Budget Summary' share>
        Children Component
      </SectionHeading>
      <DetailsWrapper>
        <DetailsContainer>
          <div>
            <Department>National departments budget</Department>
            <Amount>R{trimValues('123456789')}</Amount>
          </div>
          {callButtonExplore()}
        </DetailsContainer>
        </DetailsWrapper>
        <FooterWrapper>
          <FooterContainer>
            <FooterDetails>Budget data from 1 April 2018 - 31 March 2019</FooterDetails>
            <FooterDetails>Direct charges against the National Revenue Fund are excluded</FooterDetails>
          </FooterContainer>
        </FooterWrapper>
    </React.Fragment>
  );
};

export default Markup;
