import React from 'react';
import Media from 'react-media';
import ReactMarkdown from 'react-markdown';

import { Tooltip } from '@material-ui/core';
import trimValues from '../../../helpers/trimValues';
import SectionHeading from '../../../components/SectionHeading';
import PieChart from '../../../components/PieChart';
import calcTotal from './calcTotal';

import {
  Wrapper,
  Summary,
  Numbers,
  Budget,
  IntroMainHeading,
  IntroSubHeading,
  Percentages,
  TooltipStyled,
  TextWrapper,
  TextContainer,
  Description,
} from './styled';

const callDescription = description => {
  if (!description) {
    return null;
  }
  return (
    <React.Fragment>
      <SectionHeading title="Department information" />
      <TextWrapper>
        <TextContainer>
          <Description component="div">
            <ReactMarkdown source={description} />
          </Description>
        </TextContainer>
      </TextWrapper>
    </React.Fragment>
  );
};

const Introduction = props => {
  const { total, percentage, sphere, description } = props;

  return (
    <React.Fragment>
      <Wrapper>
        <Summary>
          <Numbers>
            <Budget>
              <IntroMainHeading>
                <Media query="(max-width: 899px)">
                  {matches => (matches ? `R${trimValues(total, true)}` : `R${trimValues(total)}`)}
                </Media>
              </IntroMainHeading>
              <IntroSubHeading>Original department budget</IntroSubHeading>
            </Budget>
            <Percentages>
              <TooltipStyled />
              <Tooltip
                title={`${percentage.toPrecision(3)}%`}
                placement="top-start"
                classes={{ tooltip: 'previewPercentageTooltip' }}
              >
                <div>
                  <IntroMainHeading>
                    <PieChart values={[percentage < 1 ? 1 : percentage]} /> {calcTotal(percentage)}%
                  </IntroMainHeading>
                  <IntroSubHeading>of {sphere} budget</IntroSubHeading>
                </div>
              </Tooltip>
            </Percentages>
          </Numbers>
        </Summary>
      </Wrapper>
      {callDescription(description)}
    </React.Fragment>
  );
};

export default Introduction;
