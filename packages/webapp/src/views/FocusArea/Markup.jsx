import React from 'react';
import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import BudgetAmounts from './BudgetAmounts';
import SectionHeading from './SectionHeading';
import ChartSection from '../../components/ChartSection';
import Treemap from '../../components/Treemap';
import calcFineprint from './calcFineprint';

import {
  Wrapper,
  TextWrapper,
  TextContainer,
  Description,
  FooterWrapper,
  FooterContainer,
  FooterDetails
} from './styled';

const callDescription = description => {
  if(!description) {
    return null;
  }
  return (
    <React.Fragment>
      <TextWrapper>
        <TextContainer>
          <Description>
            <ReactMarkdown source={description} />
          </Description>
        </TextContainer>
      </TextWrapper>
    </React.Fragment>
  );
};

const Markup = (props) => {
  const {
    resources,
    items,
    description,
    departmentNames,
    selected,
    eventHandler,
    initialSelected,
    year
  } = props;

  return (
    <Wrapper>
      <Heading {...{ departmentNames, selected, eventHandler, year }} />
      <SectionHeading title='Focus area information' />
      <BudgetAmounts {...resources} />
      {callDescription(description)}
      <div key={selected}> 
        <ChartSection
          {...{ initialSelected }}
          chart={(onSelectedChange) => <Treemap {...{ items, onSelectedChange }} />}
          verb='Explore'
          subject='this department'
          title='Contributing national departments'
          anchor='contributing-national-departments'
        />
      </div>
      <FooterWrapper>
        <FooterContainer>
          <FooterDetails>{calcFineprint(year)}</FooterDetails>
        </FooterContainer>
      </FooterWrapper>
    </Wrapper>
  );
};

export default Markup;
