import { storiesOf } from '@storybook/react';

import Random from './Random';
import Preview from './Preview';
import Secondary from './Secondary';
import PrimaryDisabled from './PrimaryDisabled';
import SecondaryDisabled from './SecondaryDisabled';
import LoadingPrimary from './LoadingPrimary';
import LoadingSecondary from './LoadingSecondary';

storiesOf('components.ContentFilterHeading', module)
  .add('Randomized state', Random)
  .add('Preview state', Preview);
