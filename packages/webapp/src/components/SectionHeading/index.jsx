import React from 'react';
import SpeedDial from '../SpeedDial';

import {
  Wrapper,
  BudgetContainer,
  BudgetHeadingAndShareIcon,
  BudgetHeading,
  ButtonYearsComponent,
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

const SectionHeading = ({ title, share }) => (
  <Wrapper>
      <BudgetContainer>
        <BudgetHeadingAndShareIcon>
          <BudgetHeading component='div'>{title}</BudgetHeading>
          {callShareIconAndDates(share)}
        </BudgetHeadingAndShareIcon>
        <ButtonYearsComponent>Hello World</ButtonYearsComponent>
    </BudgetContainer>
  </Wrapper>
);

export default SectionHeading;

