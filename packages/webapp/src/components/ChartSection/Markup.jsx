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

const callButtonExplore = (url, exploreButtonState, color,  verb, subject) => (
  <LinkWrapper href={url}>
    <ButtonStyle disabled={exploreButtonState} {...{color}}>
      <TextExploreButton>{verb} <SpanStyled>{subject}</SpanStyled></TextExploreButton>
      <Icon />
    </ButtonStyle>
  </LinkWrapper>
);

const callDetails = (selected, exploreButtonState, verb, subject) => {
  const { name, value, url, color } = selected;
  return (
    <DetailsWrapper>
      <DetailsContainer>
        <div>
          <Department>{name}</Department>
          <Amount>R{trimValues(value)}</Amount>
        </div>
        {callButtonExplore(url, exploreButtonState, color,  verb, subject)}
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
    verb,
    subject,
  } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <SectionHeading title='National Budget Summary' share={selected.name}>
        Children Component
      </SectionHeading>
      {selected && callDetails(selected, exploreButtonState, verb, subject)}
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
