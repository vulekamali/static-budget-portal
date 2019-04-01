import React from 'react';

import trimValues from '../../helpers/trimValues';
import ResizeWindowListener from '../../helpers/ResizeWindowListener';

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

const valueName = (value) => {

  const screenWidth = new ResizeWindowListener().onResize();

  if (screenWidth >= 900 ) {
    return (
      <IntroMainHeading>
        {`R${trimValues(value)}`}
      </IntroMainHeading>
    )
  } else {
    return (
      <IntroMainHeading>
        {`R${trimValues(value, true)}`}
      </IntroMainHeading>
    )
  };
};

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
            {valueName(value)}
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
