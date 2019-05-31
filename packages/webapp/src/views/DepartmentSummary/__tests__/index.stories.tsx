import { storiesOf } from '@storybook/react';
import Demo from './Demo';
import mockEndpoint from './mockEndpoint';

mockEndpoint();

storiesOf('views.DepartmentSummary', module).add('Demo', Demo);
