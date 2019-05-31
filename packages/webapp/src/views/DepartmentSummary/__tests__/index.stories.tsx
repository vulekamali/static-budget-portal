import { storiesOf } from '@storybook/react';
import Demo from './Demo';
import Random from './stories/Random';
import BarChartPresent from './stories/BarChartPresent';
import FilterDropdownPrimaryLoading from './stories/FilterDropdownPrimaryLoading';
import FilterDropdownYearsLoading from './stories/FilterDropdownYearsLoading';
import HeadingButtonDisabled from './stories/HeadingButtonDisabled';
import NoDescription from './stories/NoDescription';
import BarChartLoading from './stories/BarChartLoading';
import Notices from './stories/Notices';
import NoRelatedFocusAreas from './stories/NoRelatedFocusAreas';
import OnlyOneYear from './stories/OnlyOneYear';
import OnlyOneSelection from './stories/OnlyOneSelection';

storiesOf('views.DepartmentSummary/tests', module)
  .add('Randomized', Random)
  .add('BarChartPresent', BarChartPresent)
  .add('FilterDropdownPrimaryLoading', FilterDropdownPrimaryLoading)
  .add('FilterDropdownYearsLoading', FilterDropdownYearsLoading)
  .add('HeadingButtonDisabled', HeadingButtonDisabled)
  .add('NoDescription', NoDescription)
  .add('BarChartLoading', BarChartLoading)
  .add('Notices', Notices)
  .add('NoRelatedFocusAreas', NoRelatedFocusAreas)
  .add('OnlyOneYear', OnlyOneYear)
  .add('OnlyOneSelection', OnlyOneSelection);
