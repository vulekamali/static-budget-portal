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

const Intro = (props) => {

  const {
    value,
    consolidated,
    change,
    description
  } = props;

  return (
    <Wrapper>
      <Summary>
        <Numbers>
          <Budget>
            <IntroMainHeading>R{value} million</IntroMainHeading>
            <IntroSubHeading>Focus area budget</IntroSubHeading>
          </Budget>
          <Percentages>
            <PercentageBlock>
              <IntroMainHeading><PieIcon /> {consolidated}%</IntroMainHeading>
              <IntroSubHeading>of consolidated budget</IntroSubHeading>
            </PercentageBlock>
            <PercentageBlock>
              <IntroMainHeading><DownIcon /> {change}%</IntroMainHeading>
              <IntroSubHeading>from 2016-17</IntroSubHeading>
            </PercentageBlock>
          </Percentages>
        </Numbers>
        <Description>
          {description}
        </Description>
      </Summary>
    </Wrapper>
  );
};

export default Intro;
