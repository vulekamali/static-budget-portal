import React from 'react';
import { storiesOf } from '@storybook/react';

import FilterDropdown from '../';

const phases = {
  disabled: 'Original budget',
};

const years = {
  disabled: '2018-19',
};

const departmentNames = [
  {
    id: 'random1',
    name: 'department1',
  },
  {
    id: 'random2',
    name: 'department2',
  },
  {
    id: 'random3',
    name: 'department3',
  },
];

const phasesDropdown = () => <FilterDropdown {...{ phases }} />;
const yearsDropdown = () => <FilterDropdown {...{ years }} />;
const departmentDropdown = () => <FilterDropdown {...{ departmentNames }} />;

storiesOf('components.FilterDropdown', module)
  .add('Phases', phasesDropdown)
  .add('Years', yearsDropdown)
  .add('Departments', departmentDropdown);
