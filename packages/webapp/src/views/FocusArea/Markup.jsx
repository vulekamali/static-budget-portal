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

const callProvincialChart = (selected, initialSelected, items, footnote, notices) => {
  if(items === null || items.length === 0) {
    return (
      <div key={`${selected}-provincial`}>
      <ChartSection
        {...{ initialSelected }}
        chart={() => <Notices {...{ notices }} />}
        title='Contributing provincial departments'
        anchor='contributing-provincial-departments'
        footer={callFootNote(footnote)}
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
        footer={callFootNote(footnote)}
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
    initialSelected,
    year,
    notices,
    footnote
  } = props;

  console.log(items[selected]);

  return (
    <Wrapper>
      <Heading {...{ departmentNames, selected, eventHandler, year }} />
      <div key={`${selected}-national`}> 
        <ChartSection
          {...{ initialSelected }}
          chart={(onSelectedChange) => <Treemap {...{ onSelectedChange }} items={items[selected].national} />}
          verb='Explore'
          subject='this department'
          title='Contributing national departments'
          anchor='contributing-national-departments'
          footer={callFootNote(footnote)}
        />
      </div>
      {callProvincialChart(selected, initialSelected, items[selected].provincial, footnote, notices)}
    </Wrapper>
  );
};

export default Markup;
