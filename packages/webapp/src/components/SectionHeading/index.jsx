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

 const callSelectDownOptions = (
  <FormContainer>
    <BudgetPhase>
      <SelectStyledPhase disabled  displayEmpty classes={{ selectMenu: 'selectMenu' }}>
        <MenuItem>Original budget</MenuItem>
      </SelectStyledPhase>
    </BudgetPhase>
    <SelectStyled disabled displayEmpty classes={{ selectMenu: 'selectMenu' }}>
      <MenuItem>2017-18</MenuItem>
    </SelectStyled>
  </FormContainer>
 );

const SectionHeading = ({ title, share }) => (
  <Wrapper>
      <BudgetContainer>
        <BudgetHeadingAndShareIcon>
          <BudgetHeading component='div'>{title}</BudgetHeading>
          {callShareIcon(share)}
        </BudgetHeadingAndShareIcon>
        {callSelectDownOptions}
    </BudgetContainer>
  </Wrapper>
);

export default SectionHeading;

