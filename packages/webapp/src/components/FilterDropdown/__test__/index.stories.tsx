import React from 'react';
import { storiesOf } from '@storybook/react';

import FilterDropdown from '../';

const options = [
  {
    id: 'random1',
    name: 'department1',
    disabled: '2018-19',
  },
  {
    id: 'random2',
    name: 'department2',
    disabled: 'Original budget',
  },
  {
    id: 'random3',
    name: 'department3',
    disabled: '2018-19',
  },
];

const option = [
  {
    id: 'random1',
    name: 'department1',
    disabled: '2018-19',
  },
];

const NoOption = [];

const optionsDropdownPrimary = () => <FilterDropdown {...{ options }} primary />;
const optionsDropdownSecondary = () => <FilterDropdown {...{ options }} />;
const PrimaryDisabled = () => <FilterDropdown options={option} primary />;
const SecondaryDisabled = () => <FilterDropdown options={NoOption} />;
const PrimaryLoading = () => <FilterDropdown {...{ options }} primary loading />;
const SecondaryLoading = () => <FilterDropdown {...{ options }} loading />;

storiesOf('components.FilterDropdown', module)
  .add('Options Primary', optionsDropdownPrimary)
  .add('Options Secondary', optionsDropdownSecondary)
  .add('Primary Disabled', PrimaryDisabled)
  .add('Secondary Disabled', SecondaryDisabled)
  .add('Primary Loading', PrimaryLoading)
  .add('Secondary Loading', SecondaryLoading);
