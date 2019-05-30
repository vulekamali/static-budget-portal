import React from 'react';
import { MenuItem } from '@material-ui/core';

import { SelectPreview, SpinnerContainer, CircularProgressStyled } from './styled';

const callSpinner = value => (
  <SpinnerContainer>
    {value}
    <CircularProgressStyled size={20} thickness={2.5} />
  </SpinnerContainer>
);

const callMenuItems = (options, loading) => {
  return options.map(({ value, disabled }) => (
    <MenuItem key={value} value={value} {...{ disabled }}>
      {loading ? callSpinner(value) : value}
    </MenuItem>
  ));
};

const callOptions = (options, selected, changeSelected, primary, loading) => (
  <SelectPreview
    {...{ primary }}
    disabled={options.length <= 1 || loading}
    value={selected || options[0].id}
    onChange={({ target: { value } }) => changeSelected(value)}
    displayEmpty
    name={selected}
    classes={{ icon: 'icon', selectMenu: 'selectMenu', disabled: 'disabled' }}
  >
    {callMenuItems(options, loading)}
  </SelectPreview>
);

const Presentation = ({ options, selected, changeSelected, primary, loading }) =>
  callOptions(options, selected, changeSelected, primary, loading);

export default Presentation;
