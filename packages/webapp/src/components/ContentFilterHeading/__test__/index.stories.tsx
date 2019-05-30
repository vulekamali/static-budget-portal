import { storiesOf } from '@storybook/react';

import Random from './Random';
import Preview from './Preview';
import FocusArea from './FocusArea';
import FocusAreaButtonLoading from './FocusAreaButtonLoading';
import PreviewLoading from './PreviewLoading';
import PreviewButtonDisabled from './PreviewButtonDisabled';

storiesOf('components.ContentFilterHeading', module)
  .add('Randomized state', Random)
  .add('Preview state', Preview)
  .add('FocusArea state', FocusArea)
  .add('FocusAreaButtonLoading state', FocusAreaButtonLoading)
  .add('PreviewLoading state', PreviewLoading)
  .add('PreviewButtonDisabled state', PreviewButtonDisabled);
