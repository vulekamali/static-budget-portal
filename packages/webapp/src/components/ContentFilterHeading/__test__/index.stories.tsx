import { storiesOf } from '@storybook/react';

import Random from './Random';
import Primary from './Primary';
import Secondary from './Secondary';
import PrimaryDisabled from './PrimaryDisabled';
import SecondaryDisabled from './SecondaryDisabled';
import LoadingPrimary from './LoadingPrimary';
import LoadingSecondary from './LoadingSecondary';

storiesOf('components.ContentFilterHeading', module).add('Randomized state', Random);
