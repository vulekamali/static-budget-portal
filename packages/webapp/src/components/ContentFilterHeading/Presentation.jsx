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
  PrimaryFilter,
} from './styled';

const callDetailsButton = button => {
  if (!button) {
    return null;
  }
  return (
    <Link href={button}>
      <ButtonDetails disabled={!button} classes={{ disabled: 'disabled' }}>
        <ButtonText>
          <Details>Details</Details>
          <DetailedAnalysis>Detailed Analysis</DetailedAnalysis>
        </ButtonText>
        <ArrowStyled />
      </ButtonDetails>
    </Link>
  );
};

const Presentation = ({ title = '', selectionDropdown, yearDropdown, button }) => {
  const {
    options: selectionOptions,
    initialSelected: selectionSelected,
    onSelectedChange: selectionChange,
    loading: selectionLoading,
  } = selectionDropdown;

  const {
    options: yearOptions,
    initialSelected: yearSelected,
    onSelectedChange: yearsChange,
    loading: yearLoading,
  } = yearDropdown;

  return (
    <HeadingWrapper>
      <HeadingContainer>
        <HeadingText>
          <Title>{title && calcPrettyName(title)}</Title>
        </HeadingText>
        <SelectsGroup>
          <PrimaryFilter>
            <FilterDropdown
              primary
              options={selectionOptions}
              initialSelected={selectionSelected}
              onSelectedChange={selectionChange}
              loading={selectionLoading}
            />
          </PrimaryFilter>
          <RightOptions>
            <div>
              <FilterDropdown
                options={yearOptions}
                initialSelected={yearSelected}
                onSelectedChange={yearsChange}
                loading={yearLoading}
              />
            </div>
            {callDetailsButton(button)}
          </RightOptions>
        </SelectsGroup>
      </HeadingContainer>
    </HeadingWrapper>
  );
};

export default Presentation;
