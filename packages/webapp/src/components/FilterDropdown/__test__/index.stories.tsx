import React from 'react';
import { storiesOf } from '@storybook/react';

import FilterDropdown from '../';

const phases = {
  disabled: 'Original budget',
};

const years = {
  disabled: '2018-19',
};

const phasesDropdown = () => <FilterDropdown {...{ phases }} />;
const yearsDropdown = () => <FilterDropdown {...{ years }} />;

storiesOf('components.FilterDropdown', module)
  .add('Phases', phasesDropdown)
  .add('Years', yearsDropdown);
