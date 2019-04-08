import React from 'react';
import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import BudgetAmounts from './BudgetAmounts';
import SectionHeading from '../SectionHeading';
import BarChart from '../BarChart';
import calcFineprint from './calcFineprint';

import {
  TextWrapper,
  TextContainer,
  Description,
  FooterWrapper,
  FooterContainer,
  FooterDetails
} from './styled';

const callDescription = (description, subHeading) => {
  if(!description) {
    return null;
  }
  return (
    <React.Fragment>
      <SectionHeading title={subHeading} />
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
    subHeading
  } = props;

  return (
    <React.Fragment>
      <Heading {...{ departmentNames, government, selected, eventHandler, year, sphere }} />
      <BudgetAmounts {...resources} sphere={sphere} />
      {callDescription(description, subHeading)}
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
