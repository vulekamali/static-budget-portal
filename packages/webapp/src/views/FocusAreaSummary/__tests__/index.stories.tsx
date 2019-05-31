import { storiesOf } from '@storybook/react';
import Random from './stories/Random';
import Demo from './Demo';
import mockEndpoint from './mockEndpoint';

mockEndpoint();

storiesOf('views.FocusAreaSummary', module).add('Demo', Demo);

storiesOf('views.FocusAreaSummary/tests', module).add('Randomized state', Random);
