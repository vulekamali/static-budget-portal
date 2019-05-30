import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { storiesOf } from '@storybook/react';
import Random from './stories/Random';
import Demo from './Demo';

const mockApi = new MockAdapter(axios);
const urls = [
  '/json/2018-19/focus.json',
  '/json/2017-18/focus.json',
  '/json/2016-17/focus.json',
  '/json/2015-16/focus.json',
];

urls.forEach((url, index) => mockApi.onGet(url).reply(200, index === 1 ? {} : { test: 123 }));

storiesOf('views.FocusAreaSummary', module).add('Demo', Demo);

storiesOf('views.FocusAreaSummary/tests', module).add('Randomized state', Random);
