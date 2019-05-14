/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import BudgetAmounts from './index';

const resources = {
  value: 372800000,
  consolidated: 37.344,
};

const basic = () => (
  <Fragment>
    <CssBaseline />
    <BudgetAmounts {...resources} />
  </Fragment>
);

storiesOf('component.BudgetAmounts', module).add('Default', basic);
