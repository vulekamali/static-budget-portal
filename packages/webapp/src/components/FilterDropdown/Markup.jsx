import React from 'react';
import { MenuItem, CssBaseline } from '@material-ui/core';

import { FormContainer, SelectPreview } from './styled';

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

const FilterDropdown = ({ options, selected, eventHandler, greyTheme, disabled }) => (
  <FormContainer>
    <CssBaseline />
    {options && callOptions(options, selected, eventHandler, greyTheme, disabled)}
  </FormContainer>
);

export default FilterDropdown;
