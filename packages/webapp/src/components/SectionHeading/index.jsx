import React from 'react';
import SpeedDial from '../SpeedDial';

import {
  BudgetContainer,
  BudgetHeading,
  IconAndDates,
  DateButton,
 } from './styled';

 const callShareIconAndDates = share => {
   if(!share) return null;
   console.log(typeof(share))
   if(typeof(share) === 'string') {
    return (
      <IconAndDates>
        <SpeedDial {...{ share }} />
        <div>
          <DateButton>2019-20</DateButton>
        </div>
      </IconAndDates>
     );
   }

   if(share) return (
    <IconAndDates>
      <SpeedDial />
      <div>
        <DateButton>2019-20</DateButton>
      </div>
    </IconAndDates>
   );
 }

const SectionHeading = ({ title, share }) => (
  <BudgetContainer>
    <BudgetHeading>{title}</BudgetHeading>
    {callShareIconAndDates(share)}
  </BudgetContainer>
);

export default SectionHeading;

