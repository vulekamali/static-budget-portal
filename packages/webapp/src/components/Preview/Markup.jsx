import React from 'react';
import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import BudgetAmounts from './BudgetAmounts';
import SectionHeading from './SectionHeading';
import BarChart from '../BarChart';
import FinePrint from './FinePrint';

import {
  Wrapper,
  TextWrapper,
  TextContainer,
  Description
} from './styled';

const callDescription = (description) => {
  if(!description) {
    return null;
  }
  return (
    <React.Fragment>
      <SectionHeading title='Department Information' />
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
    description,
    sphere,
    government,
    departmentNames,
    selected,
    eventHandler,
    year,
    children,
    hasButton
  } = props;

  return (
    <Wrapper>
      <Heading {...{ departmentNames, government, selected, eventHandler, year, sphere }} hasButton={hasButton}/>
      <BudgetAmounts {...resources} sphere={sphere} />
      {callDescription(description)}
      {children}
    </Wrapper>
  );
};

export default Markup;
