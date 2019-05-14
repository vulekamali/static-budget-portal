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
    <MenuItem key={item}>{item}</MenuItem>
  );

 const callBudgetPhaseSelect = phases => (
    <BudgetPhase>
      <SelectStyledPhase displayEmpty classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }}>
        {phases.options.map(callMenuItems)}
      </SelectStyledPhase>
    </BudgetPhase>
   );

 const callYearsSelect = years => (
  <SelectStyled displayEmpty classes={{ selectMenu: 'selectMenu', disabled: 'disabled', icon: 'icon' }}>
    {years.options.map(callMenuItems)}
  </SelectStyled>
 );

 const callSelectDownOptions = (years, phases) => (
  <FormContainer>
    {phases && callBudgetPhaseSelect(phases)}
    {years && callYearsSelect(years)}
  </FormContainer>
 );

const SectionHeading = ({ title, share, years, phases }) => (
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

export default SectionHeading;
