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

  const selectedObject = items.find(({ id }) => id === department);

  return (
    <Preview {...{ resources, items, department, description, selected, eventHandler, year, hasButton, sphere }} section='Focus area information' government='Focus Areas' year='2018-19' >
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
