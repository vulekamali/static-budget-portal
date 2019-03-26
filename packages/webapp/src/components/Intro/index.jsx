import React from 'react';
import Down from '@material-ui/icons/ArrowDropDown';
import Pie from '@material-ui/icons/PieChart';

import {
  Wrapper,
  Summary,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  PercentageBlock,
  Description,
} from './styled';

const IconSize = {
  fontSize: '40px',
};

const Intro = ({ resources }) => {

  return (
    <Wrapper>
      <Summary>
        <Budget>
          <IntroMainHeading>R{resources.value} million</IntroMainHeading>
          <IntroSubHeading>Focus area budget</IntroSubHeading>
        </Budget>
        <Percentages>
          <PercentageBlock>
            <IntroMainHeading><Pie style={ IconSize } /> {resources.consolidated}%</IntroMainHeading>
            <IntroSubHeading>of consolidated budget</IntroSubHeading>
          </PercentageBlock>
          <PercentageBlock>
            <IntroMainHeading><Down style={ IconSize }/> {resources.change}%</IntroMainHeading>
            <IntroSubHeading>from 2016-17</IntroSubHeading>
          </PercentageBlock>
        </Percentages>
      </Summary>
      <Description>
        {resources.description}
      </Description>
    </Wrapper>
  );
};

export default Intro;
