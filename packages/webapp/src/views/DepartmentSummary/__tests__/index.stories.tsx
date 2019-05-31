import { storiesOf } from '@storybook/react';
import Demo from './Demo';
import Random from './stories/Random';
import BarChartPresent from './stories/BarChartPresent';
import FilterDropdownPrimaryLoading from './stories/FilterDropdownPrimaryLoading';
import FilterDropdownYearsLoading from './stories/FilterDropdownYearsLoading';
import HeadingButtonDisabled from './stories/HeadingButtonDisabled';

storiesOf('views.DepartmentSummary/tests', module)
  .add('Randomized', Random)
  .add('BarChartPresent', BarChartPresent)
  .add('FilterDropdownPrimaryLoading', FilterDropdownPrimaryLoading)
  .add('FilterDropdownYearsLoading', FilterDropdownYearsLoading)
  .add('HeadingButtonDisabled', HeadingButtonDisabled);
