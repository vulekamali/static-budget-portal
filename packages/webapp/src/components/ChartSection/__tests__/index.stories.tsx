import { storiesOf } from '@storybook/react';
import Random from './stories/Random';
import Loading from './stories/Loading';
import NoOptions from './stories/NoOptions';
import OnlyYears from './stories/OnlyYears';
import LockedYear from './stories/LockedYear';
import StringAnchor from './stories/StringAnchor';
import ButtonLoadingTrue from './stories/ButtonLoadingTrue';
import ShowNotice from './stories/ShowNotice';
import LoadingNumber from './stories/LoadingNumber';
import ButtonUrlNull from './stories/ButtonUrlNull';

storiesOf('components.ChartSection', module)
  .add('Randomized state', Random)
  .add('Loading data', Loading)
  .add('No options/Filters', NoOptions)
  .add('Only show years filter', OnlyYears)
  .add('Year filter locked', LockedYear)
  .add('Anchor is a string', StringAnchor)
  .add('Button where loading true', ButtonLoadingTrue)
  .add('Button where url is null', ButtonUrlNull)
  .add('Show Notice', ShowNotice)
  .add('Loading is a number', LoadingNumber);
