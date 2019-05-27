import React from 'react';
import { MenuItem, CssBaseline } from '@material-ui/core';

import { FormContainer, SelectStyledPhase, SelectPreview } from './styled';

const callBudgetPhaseSelect = phases => (
  <SelectPreview
    value={phases.disabled}
    disabled
    displayEmpty
    classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }}
    greyTheme
  >
    <MenuItem value={phases.disabled}>{phases.disabled}</MenuItem>
  </SelectPreview>
);

const callYearsSelect = years => (
  <SelectPreview
    value={years.disabled}
    disabled
    displayEmpty
    classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }}
    greyTheme
  >
    <MenuItem value={years.disabled}>{years.disabled}</MenuItem>
  </SelectPreview>
);

const callMenuItems = options =>
  options.map(({ id: idVal, name }) => {
    const selectedKey = options.findIndex(({ id }) => id === idVal);

    return (
      <MenuItem key={selectedKey} value={idVal}>
        {name}
      </MenuItem>
    );
  });

const callOptions = (options, selected, eventHandler, greyTheme, disabled) => (
  <SelectPreview
    {...{ greyTheme }}
    disabled={disabled}
    value={selected || options[0].id}
    onChange={eventHandler}
    displayEmpty
    name={selected}
    classes={{ icon: 'icon', selectMenu: 'selectMenu' }}
  >
    {callMenuItems(options)}
  </SelectPreview>
);

const FilterDropdown = ({
  phases,
  years,
  options,
  selected,
  eventHandler,
  greyTheme,
  disabled,
}) => (
  <FormContainer>
    <CssBaseline />
    {phases && callBudgetPhaseSelect(phases)}
    {years && callYearsSelect(years)}
    {options && callOptions(options, selected, eventHandler, greyTheme, disabled)}
  </FormContainer>
);

export default FilterDropdown;
