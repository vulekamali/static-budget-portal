import { storiesOf } from '@storybook/react';

import Random from './Random';
import Loading from './Loading';

storiesOf('views.FocusArea', module)
  .add('Randomized state', Random)
  .add('Loading data', Loading);
