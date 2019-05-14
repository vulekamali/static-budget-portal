import React from 'react';

import SpeedDial from '../SpeedDial';
import { MenuItem } from '@material-ui/core';

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
 } from './styled';

 const callShareIcon = (share) => {
   if(!share) return null;

   if(typeof(share) === 'string') {
    return (
      <SpeedDialContainer>
        <SpeedDial {...{ share }} />
      </SpeedDialContainer>
     );
   }

   if(share) return (
    <SpeedDial />
   );
 }

  const callMenuItems = item => (
    <MenuItem key={item} value={item}>{item}</MenuItem>
  );

 const callBudgetPhaseSelect = ({ selected, options, onChange }) => (
    <BudgetPhase>
      <SelectStyledPhase value={selected} classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }} onChange={event => onChange(event.target.value)} >
        {options.map(callMenuItems)}
      </SelectStyledPhase>
    </BudgetPhase>
   );

 const callYearsSelect = ({ selected, options, onChange }) => (
  <SelectStyled value={selected} classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }} onChange={event => onChange(event.target.value)} >
    {options.map(callMenuItems)}
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
        <BudgetHeading component='div'>{title}</BudgetHeading>
        {callShareIcon(share)}
      </BudgetHeadingAndShareIcon>
      {callSelectDownOptions(years, phases)}
    </BudgetContainer>
  </Wrapper>
);

export default Markup;
