import React from 'react';
import { storiesOf } from '@storybook/react';

import CallToAction from './index';

const share = () => <CallToAction share>Children Components</CallToAction>;

storiesOf('component.CallToAction', module)
  .add('Static', share)