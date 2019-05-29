import React from 'react';

import calcPrettyName from './calcPrettyName';

import FilterDropdown from '../FilterDropdown';

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
  ArrowStyled,
  Details,
  DetailedAnalysis,
} from './styled';

const Heading = ({
  government,
  options,
  selected,
  onSelectedChange,
  primary,
  loading,
  year,
  sphere,
}) => {
  const provinceFolder = government === 'south-africa' ? '' : `${government}/`;
  const url = `/${year}/${sphere}/${provinceFolder}departments/${selected}`;

  return (
    <HeadingWrapper>
      <HeadingContainer>
        <HeadingText>
          <Title>{calcPrettyName(government)}</Title>
        </HeadingText>
        <SelectsGroup>
          <FilterDropdown {...{ options, selected, onSelectedChange, primary, loading }} />
          <RightOptions>
            <FilterDropdown {...{ options, selected, onSelectedChange, loading }} />
            <Link href={url}>
              <ButtonDetails>
                <ButtonText>
                  <Details>Details</Details>
                  <DetailedAnalysis>Detailed Analysis</DetailedAnalysis>
                </ButtonText>
                <ArrowStyled />
              </ButtonDetails>
            </Link>
          </RightOptions>
        </SelectsGroup>
      </HeadingContainer>
    </HeadingWrapper>
  );
};

export default Heading;
