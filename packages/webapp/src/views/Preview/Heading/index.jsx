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
  Link,
  ButtonDetails,
  ButtonText,
  ArrowStyled
 } from './styled';

const Heading = ({ government, departmentNames, selected, eventHandler, year, sphere }) => {
  const url = `/${year}/${sphere}/${government === 'south-africa' ? '' : `${government}/`}departments/${selected}`;

  return (
    <HeadingWrapper>
      <HeadingContainer>
        <HeadingText>
          <Title>{calcPrettyName(government)}</Title>
        </HeadingText>
        <SelectsGroup>
          <CustomizedSelect {...{ departmentNames, selected, eventHandler }} />
          <RightOptions>
            <CustomizedDateSelect />
            <Link href={url}>
            <ButtonDetails>
              <ButtonText>Detailed Analysis</ButtonText>
              <ArrowStyled />
            </ButtonDetails>
            </Link>
          </RightOptions>
        </SelectsGroup>
      </HeadingContainer>
    </HeadingWrapper>
  )
};


export default Heading;
