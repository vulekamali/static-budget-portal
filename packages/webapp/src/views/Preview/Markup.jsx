import React from 'react';
import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import BudgetAmounts from './BudgetAmounts';
import SectionHeading from '../../components/SectionHeading';
import BarChart from '../../components/BarChart';
import calcFineprint from './calcFineprint';

import {
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
      <SectionHeading title='Department information' />
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
    sphere,
    government,
    departmentNames,
    selected,
    eventHandler,
    year,
  } = props;

  return (
    <React.Fragment>
      <Heading {...{ departmentNames, government, selected, eventHandler, year, sphere }} />
      <BudgetAmounts {...resources} sphere={sphere} />
      {callDescription(description)}
      <SectionHeading title='Department programmes' />
      <div key={selected}>
        <BarChart {...{ items }} />
      </div>
      <FooterWrapper>
        <FooterContainer>
          <FooterDetails>{calcFineprint(year)}</FooterDetails>
        </FooterContainer>
      </FooterWrapper>
    </React.Fragment>
  );
};

export default Markup;
