import React from 'react';

import CustomizedDateSelect from './CustomizedDateSelect';
import CustomizedSelect from './CustomizedSelect';


import {
  HeadingWrapper,
  HeadingContainer,
  HeadingText,
  Title,
  SelectsGroup,
  RightOptions,
  ButtonDetails,
  ButtonText,
  ArrowStyled
 } from './styled';


const Heading = () => (
  <HeadingWrapper>
    <HeadingContainer>
      <HeadingText>
        <Title>National Budget</Title>
      </HeadingText>
      <SelectsGroup>
        <CustomizedSelect />
        <RightOptions>
          <CustomizedDateSelect />
          <ButtonDetails>
            <ButtonText>Detailed Analysis</ButtonText>
            <ArrowStyled />
          </ButtonDetails>
        </RightOptions>
      </SelectsGroup>
    </HeadingContainer>
  </HeadingWrapper>
);


export default Heading;
