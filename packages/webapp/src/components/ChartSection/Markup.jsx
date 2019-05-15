import React from 'react';

import Icon from '@material-ui/icons/ArrowForward';
import CssBaseline from '@material-ui/core/CssBaseline';
import trimValues from '../../helpers/trimValues';
import SectionHeading from '../SectionHeading';

import {
  Wrapper,
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
  FooterDetails,
  LoadingChart,
  CircularProgressStyled,
} from './styled';

const callChart = (chart, onSelectedChange, loading) => {
  if (loading) {
    return (
      <ChartWrapper>
        <ChartContainer>
          <LoadingChart>
            <CircularProgressStyled size={100} thickness={2.5} />
          </LoadingChart>
        </ChartContainer>
      </ChartWrapper>
    );
  }
  return (
    <ChartWrapper>
      <ChartContainer>{chart(onSelectedChange)}</ChartContainer>
    </ChartWrapper>
  );
};

const callButtonExplore = (url, color, verb, subject) => {
  return (
    <LinkWrapper href={url}>
      <ButtonStyle disabled={!url} {...{ color }}>
        <TextExploreButton>
          {verb} <SpanStyled>{subject}</SpanStyled>
        </TextExploreButton>
        <Icon />
      </ButtonStyle>
    </LinkWrapper>
  );
};

const callAmount = (value, loading) => (
  <Amount ariaHidden={loading} {...{ loading }}>
    {loading ? '_'.repeat(13) : `R${trimValues(value)}`}
  </Amount>
);

const callDetails = (itemPreview, verb, subject, loading) => {
  const { name, value, url, color } = itemPreview;
  if (value === null) {
    return null;
  }
  return (
    <DetailsWrapper>
      <DetailsContainer>
        <div>
          <Department>{name}</Department>
          {callAmount(value, loading)}
        </div>
        {!!verb && callButtonExplore(url, color, verb, subject)}
      </DetailsContainer>
    </DetailsWrapper>
  );
};

const callFooter = (footer, loading) => (
  <FooterDetails ariaHidden={loading} {...{ loading }}>
    {loading ? '_'.repeat(110) : footer}
  </FooterDetails>
);

const Markup = props => {
  const {
    chart,
    itemPreview,
    onSelectedChange,
    verb,
    subject,
    footer,
    years,
    phases,
    anchor,
    title,
    loading,
  } = props;

  return (
    <Wrapper>
      <CssBaseline />
      <SectionHeading {...{ title, years, phases }} share={anchor} />
      {!!itemPreview && callDetails(itemPreview, verb, subject, loading)}
      {callChart(chart, onSelectedChange, loading)}
      <FooterWrapper>
        <FooterContainer>{footer && callFooter(footer, loading)}</FooterContainer>
      </FooterWrapper>
    </Wrapper>
  );
};

export default Markup;
