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

const Preview = ({ resources, items, description, sphere, options, handleOnSelectChange }) => (
  <React.Fragment>
    <Heading options={options} handleOnSelectChange={handleOnSelectChange} />
    <BudgetAmounts {...resources} sphere={sphere} />
    <SectionHeading title='Department information' />
    <TextWrapper>
      <TextContainer>
        <Description>
          <ReactMarkdown source={description} />
        </Description>
      </TextContainer>
    </TextWrapper>
    <SectionHeading title='Department programmes' />
    <BarChart {...{ items }} />
    <FooterWrapper>
      <FooterContainer>
        <FooterDetails>Budget data from to confirm date</FooterDetails>
      </FooterContainer>
    </FooterWrapper>
  </React.Fragment>
);

export default Preview;
