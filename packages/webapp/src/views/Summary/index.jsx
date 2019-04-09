import React from 'react';

import Preview from '../../components/Preview';
import SectionHeading from './SectionHeading';
import BarChart from '../../components/BarChart';
import FinePrint from '../../components/FinePrint';

const Summary = (props) => {
  const {
    items,
    resources,
    description,
    year
  } = props;
  return (
    <React.Fragment>
      <Preview {...{ items, resources, description }} hasButton>
        <SectionHeading title='Department programmes' />
          <div>
            <BarChart {...{ items }} />
          </div>
          <FinePrint {...{ year }} />
      </Preview>
    </React.Fragment>
  );
};

export default Summary;
