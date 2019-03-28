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

 const callChart = (chart, onSelectedChange) => (
   <ChartWrapper>
    <ChartContainer>
      {chart({onSelectedChange})}
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
    chart,
    selected,
    exploreButtonState,
    onSelectedChange,
    verb,
    subject,
    footer,
    years,
    phases,
  } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <SectionHeading title='National Budget Summary' share={selected.name} years={years} phases={phases} />
      {selected && callDetails(selected, exploreButtonState, verb, subject)}
      {callChart(chart, onSelectedChange)}
      <FooterWrapper>
        <FooterContainer>
          {footer && <FooterDetails>{footer}</FooterDetails>}
        </FooterContainer>
      </FooterWrapper>
    </React.Fragment>
  );
};

export default Markup;
