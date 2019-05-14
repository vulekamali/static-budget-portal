import React from 'react';
import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import BudgetAmounts from './BudgetAmounts';
import SectionHeading from './SectionHeading';
import FinePrint from './FinePrint';

import { Wrapper, TextWrapper, TextContainer, Description } from './styled';

const callDescription = description => {
  if (!description) {
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

const Markup = props => {
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
    hasButton,
    section,
    items,
  } = props;

  return (
    <Wrapper>
      <Heading
        {...{ departmentNames, items, government, selected, eventHandler, year, sphere, hasButton }}
      />
      <SectionHeading title={section} />
      <BudgetAmounts {...resources} sphere={sphere} />
      {callDescription(description)}
      {children}
      <FinePrint {...{ year }} />
    </Wrapper>
  );
};

export default Markup;
