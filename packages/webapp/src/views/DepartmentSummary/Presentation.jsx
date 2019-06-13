import React from 'react';
import ContentFilterHeading from '../../components/ContentFilterHeading';
import SectionHeading from '../../components/SectionHeading';
import Introduction from './Introduction';
import ChartSection from '../../components/ChartSection';
import BarChart from '../../components/BarChart';

import {
  Wrapper,
  FocusWrapper,
  FocusLinksWrapper,
  FocusLinksContainer,
  ButtonContainer,
  Link,
  ButtonStyled,
  TextButton,
  ArrowStyled,
  FooterDetails,
} from './styled';

const callFootNote = dynamicFootnotes => (
  <div key={dynamicFootnotes}>
    <FooterDetails>{dynamicFootnotes}</FooterDetails>
    <FooterDetails>
      Direct charges against the national revenue fund included here, while it is not normally
      counted as part of the total budget of the department, as it is not part of the voted
      appropriation.
    </FooterDetails>
  </div>
);

const callFocusButtons = ({ slug, title, url }) => (
  <ButtonContainer key={slug}>
    <Link href={url}>
      <ButtonStyled>
        <TextButton component="div">{title}</TextButton>
        <ArrowStyled />
      </ButtonStyled>
    </Link>
  </ButtonContainer>
);

const callFocusAreas = focusAreas => (
  <FocusWrapper>
    <SectionHeading title="Focus areas of this department" />
    <FocusLinksWrapper>
      <FocusLinksContainer>{focusAreas.map(callFocusButtons)}</FocusLinksContainer>
    </FocusLinksWrapper>
  </FocusWrapper>
);

const Presentation = props => {
  const { heading, introduction, programmes, relatedFocusAreas } = props;
  const { chartLoading, chartData, chartFooterData } = programmes;
  const {
    selectionDropdown: { initialSelected: selectionKey },
    yearDropdown: { initialSelected: yearKey },
  } = heading;

  const chartKey = `${chartData.length > 0}-${yearKey}-${selectionKey}`;

  return (
    <Wrapper>
      <ContentFilterHeading {...heading} />
      {!!introduction && <Introduction {...introduction} />}
      <div key={chartKey}>
        <ChartSection
          chart={() => <BarChart items={chartData} />}
          loading={chartLoading}
          title="Department programmes"
          footer={callFootNote(chartFooterData)}
        />
      </div>
      {relatedFocusAreas && callFocusAreas(relatedFocusAreas)}
    </Wrapper>
  );
};

export default Presentation;
