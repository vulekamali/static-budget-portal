import React from 'react';
import { storiesOf } from '@storybook/react';

import FilterDropdown from '../';

const phases = {
  disabled: 'Original budget',
};

const years = {
  disabled: '2018-19',
};

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

const phasesDropdown = () => <FilterDropdown {...{ phases }} />;
const yearsDropdown = () => <FilterDropdown {...{ years }} />;
const optionsDropdownPrimary = () => <FilterDropdown {...{ options }} />;
const optionsDropdownSecondary = () => <FilterDropdown {...{ options }} greyTheme />;
const PrimaryDisabled = () => <FilterDropdown {...{ options }} disabled />;
const SecondaryDisabled = () => <FilterDropdown {...{ options }} greyTheme disabled />;

storiesOf('components.FilterDropdown', module)
  .add('Phases', phasesDropdown)
  .add('Years', yearsDropdown)
  .add('Options Primary', optionsDropdownPrimary)
  .add('Options Secondary', optionsDropdownSecondary)
  .add('Primary Disabled', PrimaryDisabled)
  .add('Secondary Disabled', SecondaryDisabled);
