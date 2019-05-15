import React from 'react';

import { MenuItem } from '@material-ui/core';
import SpeedDial from '../SpeedDial';

import {
  Wrapper,
  BudgetContainer,
  BudgetHeadingAndShareIcon,
  BudgetHeading,
  FormContainer,
  BudgetPhase,
  SelectStyled,
  SelectStyledPhase,
  SpeedDialContainer,
  CircularProgressStyled,
} from './styled';

const callShareIcon = share => {
  if (!share) return null;

  if (typeof share === 'string') {
    return (
      <SpeedDialContainer>
        <SpeedDial {...{ share }} />
      </SpeedDialContainer>
    );
  }

  if (share) return <SpeedDial />;

  return null;
};

const callSpinner = () => <CircularProgressStyled size={20} thickness={2.5} />;

const callMenuItems = loading => item => {
  if (loading) {
    return (
      <MenuItem key={item} value={item} classes={{ selected: 'selected' }}>
        <span>{item}</span>
        {callSpinner()}
      </MenuItem>
    );
  }
  return (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  );
};

const callBudgetPhaseSelect = ({ selected, options, onChange, loading }) => (
  <BudgetPhase>
    <SelectStyledPhase
      value={selected}
      classes={{
        selectMenu: 'selectMenu',
        disabled: 'disabled',
        icon: 'icon',
        select: 'select',
      }}
      onChange={event => onChange(event.target.value)}
      disabled={loading}
    >
      {options.map(callMenuItems(loading))}
    </SelectStyledPhase>
  </BudgetPhase>
);

const callYearsSelect = ({ selected, options, onChange, loading }) => (
  <SelectStyled
    value={selected}
    classes={{
      selectMenu: 'selectMenu',
      disabled: 'disabled',
      icon: 'icon',
      select: 'select',
    }}
    onChange={event => onChange(event.target.value)}
    disabled={loading}
  >
    {options.map(callMenuItems(loading))}
  </SelectStyled>
);

const callSelectDownOptions = (years, phases) => (
  <FormContainer>
    {phases && callBudgetPhaseSelect(phases)}
    {years && callYearsSelect(years)}
  </FormContainer>
);

const Markup = ({ title, share, years, phases }) => (
  <Wrapper>
    <BudgetContainer>
      <BudgetHeadingAndShareIcon>
        <BudgetHeading component="div">{title}</BudgetHeading>
        {callShareIcon(share)}
      </BudgetHeadingAndShareIcon>
      {callSelectDownOptions(years, phases)}
    </BudgetContainer>
  </Wrapper>
);

export default Markup;
