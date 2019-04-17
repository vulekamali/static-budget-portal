import React from 'react';
import Preview from '../../components/Preview';
import ChartSection from '../../components/ChartSection';
import Treemap from '../../components/Treemap';

const FocusAreaPreview = (props) => {
  const {
    resources,
    items,
    description,
    sphere,
    government,
    selected,
    eventHandler,
    year,
    hasButton,
    initialSelected,
    department
  } = props;

  return (
    <Preview {...{ resources, items, department, description, sphere, government, selected, eventHandler, year, hasButton }} section='Focus area information' >
      <ChartSection
        {...{ initialSelected }}
        chart={(onSelectedChange) => <Treemap {...{ items, onSelectedChange }} />}
        verb='Explore'
        subject='this department'
        title='Contributing national departments'
        anchor="contributing-national-departments"
      />
    </Preview>
  )
};

export default FocusAreaPreview;
