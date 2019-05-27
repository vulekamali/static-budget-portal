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

const optionsDropdownPrimary = () => <FilterDropdown {...{ options }} />;
const optionsDropdownSecondary = () => <FilterDropdown {...{ options }} greyTheme />;
const PrimaryDisabled = () => <FilterDropdown {...{ options }} disabled />;
const SecondaryDisabled = () => <FilterDropdown {...{ options }} greyTheme disabled />;
const PrimaryLoading = () => <FilterDropdown {...{ options }} loading />;
const SecondaryLoading = () => <FilterDropdown {...{ options }} greyTheme loading />;

storiesOf('components.FilterDropdown', module)
  .add('Options Primary', optionsDropdownPrimary)
  .add('Options Secondary', optionsDropdownSecondary)
  .add('Primary Disabled', PrimaryDisabled)
  .add('Secondary Disabled', SecondaryDisabled)
  .add('Primary Loading', PrimaryLoading)
  .add('Secondary Loading', SecondaryLoading);
