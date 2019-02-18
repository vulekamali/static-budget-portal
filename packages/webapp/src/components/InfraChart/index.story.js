import React from 'react';
import { storiesOf } from '@storybook/react';
import InfraChart from './index';


const basic = () => <InfraChart />;


storiesOf('component.InfraChart', module)
  .add('Basic', basic);