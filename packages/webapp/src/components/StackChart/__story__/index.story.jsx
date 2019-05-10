/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import Demo from './Demo';
import Nested from './Nested';

storiesOf('component.StackChart', module)
  .add('Basic', () => <Fragment><CssBaseline /><Demo /></Fragment>)
  .add('Nested', () => <Fragment><CssBaseline /><Nested /></Fragment>)
  .add('Basic w/ padding', () => <div style={{ padding: '600px 0' }}><CssBaseline /><Demo /></div>)
  .add('Nested w/ padding', () => <div style={{ padding: '600px 0' }}><CssBaseline /><Nested /></div>);