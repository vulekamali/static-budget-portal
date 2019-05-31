import React from 'react';

// import ContentFilterHeading from '../../components/ContentFilterHeading';
// import ChartSection from '../../components/ChartSection';
// import Treemap from '../../components/Treemap';

// import { Wrapper } from './styled';

const Presentation = props => {
  return <div>1232</div>;

  const { heading, national, provincial } = props;
  // const { initialSelected } = selectionDropdown;
  const { chartLoading, chartData, chartTotalAmount, chartFooterData } = national;
  console.log(111, chartData);

  return (
    <Wrapper>
      <ContentFilterHeading {...heading} />
      <div>
        <ChartSection
          chart={onSelectedChange => <Treemap {...{ onSelectedChange }} items={chartData} />}
          footer={chartFooterData}
          loading={chartLoading}
          verb="Explore"
          subject="this department"
          title="Contributing provincial departments"
          anchor="contributing-provincial-departments"
        />
      </div>
    </Wrapper>
  );
};

export default Presentation;
