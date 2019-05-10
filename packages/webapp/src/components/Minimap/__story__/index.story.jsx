/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import Demo from './Demo';
import Nested from './Nested';

storiesOf('component.Minimap', module)
  .add('Demo', () => <Fragment><CssBaseline /><Demo /></Fragment>)
  .add('Nested', () => <Fragment><CssBaseline /><Nested /></Fragment>);