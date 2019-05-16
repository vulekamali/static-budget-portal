import { storiesOf } from '@storybook/react';

import Random from './Random';
import Loading from './Loading';
import NoProvinceData from './NoProvinceData';
import ProvinceDataEmpty from './ProvinceDataEmpty';
import ErrorState from './ErrorState';

storiesOf('views.FocusArea', module)
  .add('Randomized state', Random)
  .add('Loading data', Loading)
  .add('JSON file could not be loaded', ErrorState)
  .add('Provincial chart has no province data', NoProvinceData)
  .add('Provincial chart is empty', ProvinceDataEmpty);
