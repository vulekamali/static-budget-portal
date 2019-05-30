import { storiesOf } from '@storybook/react';
import Demo from './Demo';
import Random from './stories/Random';
import Primary from './stories/Primary';
import Secondary from './stories/Secondary';
import PrimaryDisabled from './stories/PrimaryDisabled';
import SecondaryDisabled from './stories/SecondaryDisabled';
import LoadingPrimary from './stories/LoadingPrimary';
import LoadingSecondary from './stories/LoadingSecondary';
import MenuItemDisabledPrimary from './stories/MenuItemDisabledPrimary';
import MenuItemDisabledSecondary from './stories/MenuItemDisabledSecondary';

storiesOf('components.FilterDropdown', module).add('Demo', Demo);

storiesOf('components.FilterDropdown/tests', module)
  .add('Randomized state', Random)
  .add('Primary', Primary)
  .add('Secondary', Secondary)
  .add('Primary Disabled', PrimaryDisabled)
  .add('Secondary Disabled', SecondaryDisabled)
  .add('Loading Primary', LoadingPrimary)
  .add('Loading Secondary', LoadingSecondary)
  .add('Menu Item Disabled Primary', MenuItemDisabledPrimary)
  .add('Menu Item Disabled Secondary', MenuItemDisabledSecondary);
