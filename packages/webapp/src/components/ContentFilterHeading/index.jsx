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

const ContentFilterHeading = ({
  // government,
  // options,
  // selected,
  // onSelectedChange,
  // primary,
  // loading,
  year,
  sphere,
  title,
  selectionDropdown,
  yearDropdown,
}) => {
  const { options, selected, onSelectedChange, primary, loading } = selectionDropdown;
  const {
    options: yearOptions,
    selected: yearSelected,
    onSelectedChange: yearOnSelectedChange,
    primary: yearPrimary,
    loading: yearLoading,
  } = yearDropdown;

  const provinceFolder = title === 'south-africa' ? '' : `${title}/`;
  const url = `/${year}/${sphere}/${provinceFolder}departments/${selected}`;

  return (
    <HeadingWrapper>
      <HeadingContainer>
        <HeadingText>
          <Title>{calcPrettyName(title)}</Title>
        </HeadingText>
        <SelectsGroup>
          <FilterDropdown {...{ options, selected, onSelectedChange, primary, loading }} />
          <RightOptions>
            <FilterDropdown
              options={yearOptions}
              selected={yearSelected}
              onSelectedChange={yearOnSelectedChange}
              primary={yearPrimary}
              loading={yearLoading}
            />
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

export default ContentFilterHeading;
