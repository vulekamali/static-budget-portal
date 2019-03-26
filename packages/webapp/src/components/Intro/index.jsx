import React from 'react';

import {
  Wrapper,
  Summary,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages
} from './styled';

const Intro = ({ }) => (
  <Wrapper>
    <Summary>
      <Budget>
        <IntroMainHeading>R372.8 million</IntroMainHeading>
        <IntroSubHeading>Focus area budget</IntroSubHeading>
      </Budget>
      <Percentages>
        <div>
          <IntroMainHeading>
            18%
          </IntroMainHeading>
          <IntroSubHeading>of consolidated budget</IntroSubHeading>
        </div>
        <div>
          <IntroMainHeading>
            4%
          </IntroMainHeading>
          <IntroSubHeading>from 2016-17</IntroSubHeading>
        </div>
      </Percentages>
    </Summary>
  </Wrapper>
);

export default Intro;
