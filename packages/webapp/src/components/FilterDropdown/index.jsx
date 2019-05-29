import React from 'react';
import { MenuItem } from '@material-ui/core';

import { SelectPreview, SpinnerContainer, CircularProgressStyled } from './styled';

const callSpinner = () => (
  <SpinnerContainer>
    <CircularProgressStyled size={20} thickness={2.5} />
  </SpinnerContainer>
);

const callMenuItems = (options, loading) => {
  return options.map(({ value, disabled }) => (
    <MenuItem key={value} value={value} {...{ disabled }}>
      {loading ? callSpinner() : value}
    </MenuItem>
  ));
};

const callOptions = (options, selected, onSelectionChange, primary, loading) => (
  <SelectPreview
    {...{ primary }}
    disabled={options.length <= 1 || loading}
    value={selected || options[0].id}
    onChange={onSelectionChange}
    displayEmpty
    name={selected}
    classes={{ icon: 'icon', selectMenu: 'selectMenu', disabled: 'disabled' }}
  >
    {callMenuItems(options, loading)}
  </SelectPreview>
);

const FilterDropdown = ({ options, selected, onSelectionChange, primary, loading }) =>
  callOptions(options, selected, onSelectionChange, primary, loading);

export default FilterDropdown;
