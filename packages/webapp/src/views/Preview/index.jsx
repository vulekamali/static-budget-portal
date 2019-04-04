import React from 'react';
import ReactMarkdown from 'react-markdown';

import Intro from './Intro';
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

const Preview = ({ resources, items, description, sphere }) => (
  <React.Fragment>
    <Intro {...resources} sphere={sphere} />
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
