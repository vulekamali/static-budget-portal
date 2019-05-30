import { storiesOf } from '@storybook/react';
import Demo from './Demo';
import Random from './stories/Random';
import Preview from './stories/Preview';
import FocusArea from './stories/FocusArea';
import FocusAreaButtonLoading from './stories/FocusAreaButtonLoading';
import PreviewLoading from './stories/PreviewLoading';

storiesOf('components.ContentFilterHeading', module).add('Demo', Demo);

storiesOf('components.ContentFilterHeading/tests', module)
  .add('Randomized state', Random)
  .add('Preview state', Preview)
  .add('FocusArea state', FocusArea)
  .add('FocusAreaButtonLoading state', FocusAreaButtonLoading)
  .add('PreviewLoading state', PreviewLoading);
