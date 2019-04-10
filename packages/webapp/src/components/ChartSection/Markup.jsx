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
      {chart(onSelectedChange)}
    </ChartContainer>
   </ChartWrapper>
 );

const callButtonExplore = (url, color,  verb, subject, isConsolidatedChart) => {
  if(isConsolidatedChart) {
    return null;
  }
  return (
    <LinkWrapper href={url}>
      <ButtonStyle disabled={!url} {...{color}}>
        <TextExploreButton>{verb} <SpanStyled>{subject}</SpanStyled></TextExploreButton>
        <Icon />
      </ButtonStyle>
    </LinkWrapper>
  );
};

const callDetails = (selected, verb, subject, isConsolidatedChart) => {
  const { name, value, url, color } = selected;
  return (
    <DetailsWrapper>
      <DetailsContainer>
        <div>
          <Department>{name}</Department>
          <Amount>R{trimValues(value)}</Amount>
        </div>
        {callButtonExplore(url, color,  verb, subject, isConsolidatedChart)}
      </DetailsContainer>
    </DetailsWrapper>
  );
};

const Markup = (props) => {
  const {
    chart,
    selected,
    onSelectedChange,
    verb,
    subject,
    footer,
    years,
    phases,
    anchor,
    title,
    isConsolidatedChart
  } = props;
  
  return (
    <React.Fragment>
      <CssBaseline />
      <SectionHeading title={title} share={anchor} years={years} phases={phases} />
      {!!selected && callDetails(selected, verb, subject, isConsolidatedChart)} 
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
