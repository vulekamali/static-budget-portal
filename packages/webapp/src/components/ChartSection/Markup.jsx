import React from 'react';

import Icon from '@material-ui/icons/ArrowForward';
import CssBaseline from '@material-ui/core/CssBaseline';
import trimValues from '../../helpers/trimValues';
import SectionHeading from '../SectionHeading';
import Notices from './Notices';

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

const callChart = (chart, onSelectedChange, loading, notices) => {
  if (loading) {
    return (
      <ChartWrapper>
        <ChartContainer>
          <LoadingChart {...{ loading }}>
            <CircularProgressStyled size={100} thickness={2.5} />
          </LoadingChart>
        </ChartContainer>
      </ChartWrapper>
    );
  }

  if (notices) {
    return (
      <ChartWrapper>
        <ChartContainer>
          <Notices {...{ notices }} />
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

const callButtonExplore = (url, color, verb, subject, loading, notices) => {
  return (
    <LinkWrapper href={loading ? null : url}>
      <ButtonStyle disabled={!url || !!loading || notices} {...{ color }}>
        <TextExploreButton>
          {verb} <SpanStyled>{subject}</SpanStyled>
        </TextExploreButton>
        <Icon />
      </ButtonStyle>
    </LinkWrapper>
  );
};

const callAmount = (value, loading) => (
  <Amount aria-hidden={loading} {...{ loading }} component="div">
    {loading ? '_'.repeat(13) : `R${trimValues(value)}`}
  </Amount>
);

const callDetails = (itemPreview, verb, subject, loading, notices) => {
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
        {!!verb && callButtonExplore(url, color, verb, subject, loading, notices)}
      </DetailsContainer>
    </DetailsWrapper>
  );
};

const callFooter = (footer, loading) => (
  <FooterDetails aria-hidden={loading} {...{ loading }} component="div">
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
    notices,
  } = props;

  return (
    <Wrapper>
      <CssBaseline />
      <SectionHeading {...{ title, years, phases }} share={anchor} />
      {!!itemPreview && callDetails(itemPreview, verb, subject, loading, notices)}
      {callChart(chart, onSelectedChange, loading, notices)}
      <FooterWrapper>
        <FooterContainer>{footer && callFooter(footer, loading)}</FooterContainer>
      </FooterWrapper>
    </Wrapper>
  );
};

export default Markup;
