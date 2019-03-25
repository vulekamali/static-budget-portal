import React from 'react';
import SpeedDial from '../SpeedDial';

import {
  Wrapper,
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  SpeedDialStyled,
 } from './styled';

 const callShareIconAndDates = (share, children) => {
   if(!share) return null;

   if(typeof(share) === 'string') {
    return (
      <IconAndDates>
        <SpeedDialStyled>
          <SpeedDial {...{ share }} />
        </SpeedDialStyled>
        <div>
          {children}
        </div>
      </IconAndDates>
     );
   }

   if(share) return (
    <IconAndDates>
      <SpeedDialStyled>
        <SpeedDial />
      </SpeedDialStyled>
      <div>
        {children}
      </div>
    </IconAndDates>
   );
 }

const SectionHeading = ({ title, share, children }) => (
  <Wrapper>
      <BudgetContainer>
        <BudgetHeading component='div'>{title}</BudgetHeading>
        {callShareIconAndDates(share, children)}
    </BudgetContainer>
  </Wrapper>
);

export default SectionHeading;

