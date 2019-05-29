import { storiesOf } from '@storybook/react';

import Random from './Random';
import Primary from './Primary';
import Secondary from './Secondary';
import PrimaryDisabled from './PrimaryDisabled';
import SecondaryDisabled from './SecondaryDisabled';
import LoadingPrimary from './LoadingPrimary';
import LoadingSecondary from './LoadingSecondary';

storiesOf('components.ContentFilterDropdown', module)
  .add('Randomized state', Random)
  .add('Primary', Primary)
  .add('Secondary', Secondary)
  .add('Primary Disabled', PrimaryDisabled)
  .add('Secondary Disabled', SecondaryDisabled)
  .add('Loading Primary', LoadingPrimary)
  .add('Loading Secondary', LoadingSecondary);
