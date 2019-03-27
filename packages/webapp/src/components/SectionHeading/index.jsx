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
  SelectStyled
 } from './styled';

 const callShareIconAndDates = (share) => {
   if(!share) return null;

   if(typeof(share) === 'string') {
    return (
      <SpeedDial {...{ share }} />
     );
   }

   if(share) return (
    <SpeedDial />
   );
 }

 const callSelectDownOptions = (
  <FormContainer>
    <BudgetPhase>
      <SelectStyled disabled displayEmpty classes={{ selectMenu: 'selectMenu' }}>
        <MenuItem>Original budget</MenuItem>
      </SelectStyled>
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
          {callShareIconAndDates(share)}
        </BudgetHeadingAndShareIcon>
        {callSelectDownOptions}
    </BudgetContainer>
  </Wrapper>
);

export default SectionHeading;

