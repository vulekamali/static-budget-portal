import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import Intro from './index';

const resources = {
    value: 372800000,
    consolidated: 37.344,
    change: -5
  };

const basic = () => (
  <Fragment>
    <CssBaseline />
    <Intro {...resources} />
  </Fragment>
);

storiesOf('component.Intro', module)
  .add('Default', basic);
