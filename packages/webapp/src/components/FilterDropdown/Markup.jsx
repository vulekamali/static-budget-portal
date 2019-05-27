import React from 'react';
import { MenuItem, CssBaseline } from '@material-ui/core';

import { FormContainer, SelectPreview, CircularProgressStyled } from './styled';

const callSpinner = () => <CircularProgressStyled size={20} thickness={2.5} />;

const callMenuItems = (options, loading) => {
  if (loading) {
    return <MenuItem>{callSpinner()}</MenuItem>;
  }

  return options.map(({ id: idVal, name }) => {
    const selectedKey = options.findIndex(({ id }) => id === idVal);

    return (
      <MenuItem key={selectedKey} value={idVal}>
        {name}
      </MenuItem>
    );
  });
};

const callOptions = (options, selected, eventHandler, greyTheme, disabled, loading) => (
  <SelectPreview
    {...{ greyTheme }}
    disabled={disabled}
    value={selected || options[0].id}
    onChange={eventHandler}
    displayEmpty
    name={selected}
    classes={{ icon: 'icon', selectMenu: 'selectMenu' }}
  >
    {callMenuItems(options, loading)}
  </SelectPreview>
);

const FilterDropdown = ({ options, selected, eventHandler, greyTheme, disabled, loading }) => (
  <FormContainer>
    <CssBaseline />
    {options && callOptions(options, selected, eventHandler, greyTheme, disabled, loading)}
  </FormContainer>
);

export default FilterDropdown;
