import React from 'react';

import {
  Wrapper,
  Summary,
  Numbers,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  PercentageBlock,
  PieIcon,
  DownIcon,
  Description,
} from './styled';

const Intro = ({ resources }) => {

  return (
    <Wrapper>
      <Summary>
        <Numbers>
          <Budget>
            <IntroMainHeading>R{resources.value} million</IntroMainHeading>
            <IntroSubHeading>Focus area budget</IntroSubHeading>
          </Budget>
          <Percentages>
            <PercentageBlock>
              <IntroMainHeading><PieIcon /> {resources.consolidated}%</IntroMainHeading>
              <IntroSubHeading>of consolidated budget</IntroSubHeading>
            </PercentageBlock>
            <PercentageBlock>
              <IntroMainHeading><DownIcon /> {resources.change}%</IntroMainHeading>
              <IntroSubHeading>from 2016-17</IntroSubHeading>
            </PercentageBlock>
          </Percentages>
        </Numbers>
        <Description>
          {resources.description}
        </Description>
      </Summary>
    </Wrapper>
  );
};

export default Intro;
