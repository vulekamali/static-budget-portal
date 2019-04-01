import React from 'react';

import trimValues from '../../helpers/trimValues';
import ResizeWindowListener from '../../helpers/ResizeWindowListener';
import PieChart from '../PieChart'

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
  Description,
} from './styled';

const screenWidth = new ResizeWindowListener().onResize();

const valueName = (value) => {

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

const PieChartSized = (consolidated) => {
  if (screenWidth >= 900 ) {
    return (
      <PieChart dimensions="40" values={[consolidated]} />
    )
  } else {
    return (
      <PieChart dimensions="20" values={[consolidated]} />
    )
  }
};

const changeIcon = (change) => {
  if (change > 0) {
    return <UpIcon />
  } else if (change < 0) {
    return <DownIcon />
  }
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
              <IntroMainHeading>{PieChartSized(consolidated)} {consolidated}%</IntroMainHeading>
              <IntroSubHeading>of consolidated budget</IntroSubHeading>
            </PercentageBlock>
            <PercentageBlock>
              <IntroMainHeading>{changeIcon(change)} {Math.abs(change)}%</IntroMainHeading>
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
