import React from 'react';
import { storiesOf } from '@storybook/react';
import NationalMap from './index';


const projects = {
  project1: ['id1', 'id2'],
  project2: ['id3']
}

const points = {
  id1: {
    x: 100,
    y: 100,
  },
  id2: {
    x: 200,
    y: 200,
  },
  id3: {
    x: 300,
    y: 300
  },
};


const nationalMap = () => <NationalMap />;
const smallMap = () => <NationalMap size="small" />;
const activeMap = () => <NationalMap active="Western Cape" />;
const pointsMap = () => <NationalMap {...{ points, projects }} />;


storiesOf('component.NationalMap', module)
  .add('Default', nationalMap)
  .add('Small', smallMap)
  .add('Manual Active Province', activeMap)
  .add('With Points', pointsMap);