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

const callDetailsButton = button => {
  if (!button) {
    return null;
  }
  const { url } = button;
  return (
    <Link href={url}>
      <ButtonDetails disabled={!url} classes={{ disabled: 'disabled' }}>
        <ButtonText>
          <Details>Details</Details>
          <DetailedAnalysis>Detailed Analysis</DetailedAnalysis>
        </ButtonText>
        <ArrowStyled />
      </ButtonDetails>
    </Link>
  );
};

const ContentFilterHeading = ({ title, selectionDropdown, yearDropdown, button }) => {
  const { options, selected, onSelectedChange, primary, loading } = selectionDropdown;
  const {
    options: yearOptions,
    selected: yearSelected,
    onSelectedChange: yearOnSelectedChange,
    primary: yearPrimary,
    loading: yearLoading,
  } = yearDropdown;

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
            {callDetailsButton(button)}
          </RightOptions>
        </SelectsGroup>
      </HeadingContainer>
    </HeadingWrapper>
  );
};

export default ContentFilterHeading;
