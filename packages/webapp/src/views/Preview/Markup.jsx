import React from 'react';
import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import BudgetAmounts from './BudgetAmounts';
import SectionHeading from '../../components/SectionHeading';
import BarChart from '../../components/BarChart';

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
    eventHandler
  } = props;

  return (
    <React.Fragment>
      <Heading government={government} {...{ departmentNames, selected, eventHandler }} />
      <BudgetAmounts {...resources} sphere={sphere} />
      {callDescription(description)}
      <SectionHeading title='Department programmes' />
      <div key={selected}>
        <BarChart {...{ items }} />
      </div>
      <FooterWrapper>
        <FooterContainer>
          <FooterDetails>Budget data from to confirm date</FooterDetails>
        </FooterContainer>
      </FooterWrapper>
    </React.Fragment>
  );
};

export default Markup;
