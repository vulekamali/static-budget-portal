import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartSection from './Markup';

const basic = () => <ChartSection />;


storiesOf('component.ChartSection', module)
  .add('Default', basic)
