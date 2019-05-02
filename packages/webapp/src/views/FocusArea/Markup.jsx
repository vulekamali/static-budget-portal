import React from 'react';
import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import ChartSection from '../../components/ChartSection';
import Treemap from '../../components/Treemap';
import Notices from './Notices';

import {
  Wrapper,
  FooterDetails
} from './styled';

const callFootNote = footnote => footnote.map(footer => (
  <div key={footer}>
      <FooterDetails component='div'>
        <ReactMarkdown source={footer} />
      </FooterDetails>
  </div>
))

const callProvincialChart = (selected, initialSelected, items, footnotes, notices) => {
  if(initialSelected.value === null || Object.entries(items).length === 0) {
    return (
      <div key={`${selected}-provincial`}>
      <ChartSection
        {...{ initialSelected }}
        chart={() => <Notices {...{ notices }} />}
        title='Contributing provincial departments'
        anchor='contributing-provincial-departments'
        footer={callFootNote(footnotes)}
      />
    </div>
    );
  }
  return (
    <div key={`${selected}-provincial`}>
      <ChartSection
        {...{ initialSelected }}
        chart={(onSelectedChange) => <Treemap {...{ items, onSelectedChange }} />}
        verb='Explore'
        subject='this department'
        title='Contributing provincial departments'
        anchor='contributing-provincial-departments'
        footer={callFootNote(footnotes)}
      />
    </div>
  );
}

const Markup = (props) => {
  const {
    items,
    departmentNames,
    selected,
    eventHandler,
    initialSelectedNational,
    initialSelectedProvincial,
    year
  } = props;

  return (
    <Wrapper>
      <Heading {...{ departmentNames, selected, eventHandler, year }} />
      <div key={`${selected}-national`}> 
        <ChartSection
          initialSelected={initialSelectedNational}
          chart={(onSelectedChange) => <Treemap {...{ onSelectedChange }} items={items[selected].national.departments} />}
          verb='Explore'
          subject='this department'
          title='Contributing national departments'
          anchor='contributing-national-departments'
          footer={callFootNote(items[selected].national.footnotes)}
        />
      </div>
      {callProvincialChart(selected, initialSelectedProvincial, items[selected].provincial.provinces, items[selected].provincial.footnotes, items[selected].provincial.notices)}
    </Wrapper>
  );
};

export default Markup;
