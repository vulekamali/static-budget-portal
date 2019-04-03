import React from 'react';
import Media from 'react-media';

import trimValues from '../../helpers/trimValues';
import PieChart from '../PieChart';

import {
  Wrapper,
  Summary,
  Numbers,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  PercentageBlock,
  DownIcon,
  UpIcon,
} from './styled';

const Intro = (props) => {

  const {
    value,
    consolidated,
    change,
    description
  } = props;

  const changeIcon = (change) => {
    if (change > 0) {
      return <UpIcon />
    } else if (change < 0) {
      return <DownIcon />
    }
  };

  return (
    <Wrapper>
      <Summary>
        <Numbers>
          <Budget>
            <IntroMainHeading>
            <Media query="(max-width: 899px)">
              {matches =>
                matches ? (
                  `R${trimValues(value, true)}`
                ) : (
                  `R${trimValues(value)}`
                )
              }
            </Media>
            </IntroMainHeading>
            <IntroSubHeading>Focus area budget</IntroSubHeading>
          </Budget>
          <Percentages>
            <PercentageBlock>
              <IntroMainHeading>
                <PieChart values={[consolidated]} /> {consolidated}%
              </IntroMainHeading>
              <IntroSubHeading>of consolidated budget</IntroSubHeading>
            </PercentageBlock>
            <PercentageBlock>
              <IntroMainHeading>{changeIcon(change)} {Math.abs(change)}%</IntroMainHeading>
              <IntroSubHeading>from 2016-17</IntroSubHeading>
            </PercentageBlock>
          </Percentages>
        </Numbers>
      </Summary>
    </Wrapper>
  );
};

export default Intro;
