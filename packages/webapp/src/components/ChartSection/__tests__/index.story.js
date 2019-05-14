import { storiesOf } from '@storybook/react';

import Random from './Random';
import Loading from './Loading';
import NoOptions from './NoOptions';
import OnlyYears from './OnlyYears';
import LockedYear from './LockedYear';
import StringAnchor from './StringAnchor';
import ButtonLoadingFalse from './ButtonLoadingFalse';


storiesOf('component.ChartSection', module)
  .add('Randomized state', Random)
  .add('Loading data', Loading)
  .add('No options/Filters', NoOptions)
  .add('Only show years filter', OnlyYears)
  .add('Year filter locked', LockedYear)
  .add('Anchor is a string', StringAnchor)
  .add('Button where loading false', ButtonLoadingFalse);
