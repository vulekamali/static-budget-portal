import React from 'react';
import { MenuItem } from '@material-ui/core';

import { FormContainer, SelectPreview, CircularProgressStyled } from './styled';

const callSpinner = () => <CircularProgressStyled size={20} thickness={2.5} />;

const callMenuItems = (options, loading) => {
  if (loading) {
    return (
      <MenuItem value="boom" displayEmpty name="something">
        {callSpinner()}
      </MenuItem>
    );
  }

  return options.map(({ id, name }) => (
    <MenuItem key={id} value={id}>
      {name}
    </MenuItem>
  ));
};

const callOptions = (options, selected, onSelectionChange, greyTheme, disabled, loading) => (
  <SelectPreview
    {...{ greyTheme, disabled }}
    value={selected || options[0].id}
    onChange={onSelectionChange}
    displayEmpty
    name={selected}
    classes={{ icon: 'icon', selectMenu: 'selectMenu' }}
  >
    {callMenuItems(options, loading)}
  </SelectPreview>
);

const FilterDropdown = ({ options, selected, onSelectionChange, greyTheme, disabled, loading }) => (
  <FormContainer>
    {options && callOptions(options, selected, onSelectionChange, greyTheme, disabled, loading)}
  </FormContainer>
);

export default FilterDropdown;
