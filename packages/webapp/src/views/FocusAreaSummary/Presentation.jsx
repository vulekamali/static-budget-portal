import React from 'react';
import ReactMarkdown from 'react-markdown';

import ContentFilterHeading from '../../components/ContentFilterHeading';
import ChartSection from '../../components/ChartSection';
import Treemap from '../../components/Treemap';
import ErrorMessage from './ErrorMessage';

import { Wrapper, FooterDetails } from './styled';

const addDynamicFootnotes = dynamicFootnotes =>
  dynamicFootnotes.map(footer => (
    <FooterDetails key={footer} component="div">
      <ReactMarkdown source={footer} />
    </FooterDetails>
  ));

const callFootNote = dynamicFootnotes => (
  <div key={dynamicFootnotes}>
    {!!dynamicFootnotes && addDynamicFootnotes(dynamicFootnotes)}
    <FooterDetails>Flows between spheres have not been netted out.</FooterDetails>
  </div>
);

const callProvincialChart = provincial => {
  const {
    chartLoading,
    chartData,
    intialSelectedValues,
    chartFooterData,
    chartNoticesData,
  } = provincial;

  return (
    <div key={`${provincial}-provincial`}>
      <ChartSection
        itemPreview={intialSelectedValues}
        chart={onSelectedChange => <Treemap {...{ onSelectedChange }} items={chartData} />}
        footer={callFootNote(chartFooterData)}
        loading={chartLoading}
        verb="Explore"
        subject="this department"
        title="Contributing provincial departments"
        notices={chartNoticesData}
      />
    </div>
  );
};

const callCharts = props => {
  const { error, heading, national, provincial } = props;
  const { chartLoading, chartData, intialSelectedValues, chartFooterData } = national;

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <React.Fragment>
      <div key={heading.selectionDropdown.initialSelected}>
        <ChartSection
          itemPreview={intialSelectedValues}
          chart={onSelectedChange => <Treemap {...{ onSelectedChange }} items={chartData} />}
          footer={callFootNote(chartFooterData)}
          loading={chartLoading}
          verb="Explore"
          subject="this department"
          title="Contributing National departments"
        />
      </div>
      {callProvincialChart(provincial)}
    </React.Fragment>
  );
};

const Presentation = props => {
  const { error, heading, national, provincial } = props;
  const { chartLoading, chartData, intialSelectedValues, chartFooterData } = national;

  return (
    <Wrapper>
      <ContentFilterHeading {...heading} title="Focus-Areas" />
      {callCharts(props)}
    </Wrapper>
  );
};

export default Presentation;
