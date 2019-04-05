import React from 'react';

import calcPrettyName from './calcPrettyName';

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


const Heading = ({ government, departmentNames, selected, eventHandler }) => (
  <HeadingWrapper>
    <HeadingContainer>
      <HeadingText>
        <Title>{calcPrettyName(government)}</Title>
      </HeadingText>
      <SelectsGroup>
        <CustomizedSelect {...{ departmentNames, selected, eventHandler }} />
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
