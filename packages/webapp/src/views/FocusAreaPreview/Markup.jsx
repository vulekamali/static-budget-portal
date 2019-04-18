import React from 'react';
import Preview from '../../components/Preview';
import ChartSection from '../../components/ChartSection';
import Treemap from '../../components/Treemap';

const FocusAreaPreview = (props) => {
  const {
    resources,
    items,
    description,
    selected,
    eventHandler,
    year,
    hasButton,
    initialSelected,
    department,
    selectedObject
  } = props;

  return (
    <Preview {...{ resources, items, department, description, selected, eventHandler, year, hasButton }} section='Focus area information' >
      <ChartSection
        {...{ initialSelected }}
        chart={(onSelectedChange) => <Treemap {...{ onSelectedChange }} items={selectedObject.items} />}
        verb='Explore'
        subject='this department'
        title='Contributing national departments'
        anchor="contributing-national-departments"
      />
    </Preview>
  )
};

export default FocusAreaPreview;

