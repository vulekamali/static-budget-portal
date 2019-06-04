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
} from './styled';

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
  const { heading, introduction, programmes, relatedFocusAreas, button } = props;

  const { chartLoading, chartData, chartFooterData, chartNoticeData } = programmes;

  return (
    <Wrapper>
      <ContentFilterHeading {...heading} {...{ button }} title="National Budget" />
      <Introduction {...introduction} />
      <div key={heading.selectionDropdown.initialSelected}>
        <ChartSection
          chart={() => <BarChart items={chartData} />}
          footer={chartFooterData}
          loading={chartLoading}
          title="Department programmes"
          notices={chartNoticeData}
        />
      </div>
      {relatedFocusAreas && callFocusAreas(relatedFocusAreas)}
    </Wrapper>
  );
};

export default Presentation;
