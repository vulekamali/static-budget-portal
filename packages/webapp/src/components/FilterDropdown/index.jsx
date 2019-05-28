import React from 'react';
import { MenuItem } from '@material-ui/core';

import { SelectPreview, SpinnerContainer, CircularProgressStyled } from './styled';

const callSpinner = () => <CircularProgressStyled size={20} thickness={2.5} />;

const callMenuItems = (options, loading) => {
  if (loading) {
    return (
      <MenuItem value={options[0].id}>
        <SpinnerContainer>{callSpinner()}</SpinnerContainer>
      </MenuItem>
    );
  }

  return options.map(({ id, name }) => (
    <MenuItem key={id} value={id}>
      {name}
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
    {options.length > 0 && callMenuItems(options, loading)}
  </SelectPreview>
);

const FilterDropdown = ({ options, selected, onSelectionChange, primary, loading }) =>
  callOptions(options, selected, onSelectionChange, primary, loading);

export default FilterDropdown;
