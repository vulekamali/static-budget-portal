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
  SpanStyled,
  DetailsContainer,
  Department,
  Amount,
  ChartWrapper,
  ChartContainer,
  FooterWrapper,
  FooterContainer,
  FooterDetails
 } from './styled';

 const callChart = (Chart, onSelectedChange) => (
   <ChartWrapper>
    <ChartContainer>
      <Chart onSelectedChange={onSelectedChange} />
    </ChartContainer>
   </ChartWrapper>
 );

const callButtonExplore = (url, exploreButtonState, color) => (
  <LinkWrapper href={url}>
    <ButtonStyle disabled={exploreButtonState} {...{color}}>
      <TextExploreButton>Explore <SpanStyled>this department</SpanStyled></TextExploreButton>
      <Icon />
    </ButtonStyle>
  </LinkWrapper>
);

const callDetails = (selected, exploreButtonState) => {
  const { name, value, url, color } = selected;
  return (
    <DetailsWrapper>
      <DetailsContainer>
        <div>
          <Department>{name}</Department>
          <Amount>R{trimValues(value)}</Amount>
        </div>
        {callButtonExplore(url, exploreButtonState, color)}
      </DetailsContainer>
    </DetailsWrapper>
  );
};

const Markup = (props) => {
  const {
    chart: Chart,
    selected,
    exploreButtonState,
    onSelectedChange,
  } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <SectionHeading title='National Budget Summary' share>
        Children Component
      </SectionHeading>
      {selected && callDetails(selected, exploreButtonState)}
        {callChart(Chart, onSelectedChange)}
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
