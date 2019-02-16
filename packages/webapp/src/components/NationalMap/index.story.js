import React from 'react';
import { storiesOf } from '@storybook/react';
import NationalMap from './index';


const projects = {
  project1: {
    id: 'project1',
    title: 'Project 1',
    points: ['Cape Town', 'Pretoria'],
    provinces: ['Western Cape', 'Gauteng']
  },
  project2: {
    id: 'project2',
    title: 'Project 2',
    points: ['Port Elizabeth'],
    provinces: ['Eastern Cape'],
  },
  project3: {
    id: 'project3',
    title: 'Project 3',
    points: ['Border Crossing'],
    provinces: ['Limpopo'],
  },
}

const points = [
  {
    id: 'Cape Town',
    x: 18.468361,
    y: -33.920175,
  },
  {
    id: 'Pretoria',
    x: 28.198471,
    y: -25.739050,
  },
  {
    id: 'Port Elizabeth',
    x: 25.620117,
    y: -33.954467
  },
  {
    id: 'Border Crossing',
    x: 29.983063,
    y: -22.228865,
  }
];


const nationalMap = () => <NationalMap />;
const smallMap = () => <NationalMap size="small" />;
const activeMap = () => <NationalMap activeProvinces={["Western Cape"]} />;
const pointsMap = () => <NationalMap {...{ points, projects }} />;
const selectionMap = () => <NationalMap {...{ points, projects }} selected="project1" />;

storiesOf('component.NationalMap', module)
  .add('Default', nationalMap)
  .add('Small', smallMap)
  .add('Manual Active Province', activeMap)
  .add('With Points', pointsMap)
  .add('Force Selection', selectionMap);