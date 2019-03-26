import React from 'react';
import { storiesOf } from '@storybook/react';
import Intro from './index';

const basic = () => <Intro />;

storiesOf('component.Intro', module)
  .add('Default', basic)
