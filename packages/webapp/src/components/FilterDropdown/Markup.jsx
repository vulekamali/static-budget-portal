import React from 'react';
import { MenuItem } from '@material-ui/core';

import {
  FormContainer,
  BudgetPhase,
  SelectStyled,
  SelectStyledPhase,
  SelectPreview,
} from './styled';

const callMenuItems = departmentNames =>
  departmentNames.map(({ id: idVal, name }) => {
    const selectedKey = departmentNames.findIndex(({ id }) => id === idVal);

    return (
      <MenuItem key={selectedKey} value={idVal}>
        {name}
      </MenuItem>
    );
  });

const calldepartmentSelect = (departmentNames, selected, eventHandler) => (
  <SelectPreview
    value={selected}
    onChange={eventHandler}
    displayEmpty
    name={selected}
    classes={{ icon: 'icon', selectMenu: 'selectMenu' }}
  >
    {callMenuItems(departmentNames)}
  </SelectPreview>
);

const callBudgetPhaseSelect = phases => (
  <BudgetPhase>
    <SelectStyledPhase
      value={phases.disabled}
      disabled
      displayEmpty
      classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }}
    >
      <MenuItem value={phases.disabled}>{phases.disabled}</MenuItem>
    </SelectStyledPhase>
  </BudgetPhase>
);

const callYearsSelect = years => (
  <SelectStyled
    value={years.disabled}
    disabled
    displayEmpty
    classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }}
  >
    <MenuItem value={years.disabled}>{years.disabled}</MenuItem>
  </SelectStyled>
);

const FilterDropdown = ({ years, phases, departmentNames, selected, eventHandler }) => (
  <FormContainer>
    {phases && callBudgetPhaseSelect(phases)}
    {years && callYearsSelect(years)}
    {departmentNames && calldepartmentSelect(departmentNames, selected, eventHandler)}
  </FormContainer>
);

export default FilterDropdown;
