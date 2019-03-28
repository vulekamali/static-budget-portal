/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { CssBaseline } from '@material-ui/core';

import { randomLengthBlankArray, randomNumber, randomBool } from '../../helpers/randomizer';
import Treemap from './index';

const smallItems = randomLengthBlankArray(5, 9).map((value, id) => ({
  id,
  name: randomBool()
    ? faker.commerce.productName()
    : `${faker.commerce.productName()} ${faker.commerce.productName()}`,
  amount: randomNumber(5000, 5000000000),
  url: '#',
  percentage: randomNumber(1, 100),
}));

const basicItems = randomLengthBlankArray(20, 30).map((value, id) => ({
  id,
  name: randomBool()
    ? faker.commerce.productName()
    : `${faker.commerce.productName()} ${faker.commerce.productName()}`,
  amount: randomNumber(5000, 5000000000),
  url: '#',
  percentage: randomNumber(1, 100),
}));

const largeItem = randomLengthBlankArray(35, 45).map((value, id) => ({
  id,
  name: randomBool()
    ? faker.commerce.productName()
    : `${faker.commerce.productName()} ${faker.commerce.productName()}`,
  amount: randomNumber(5000, 5000000000),
  url: '#',
  percentage: randomNumber(1, 100),
}));

const SmallWithKnobs = (): JSX.Element => {
  return (
    <Fragment>
      <CssBaseline />
      <Treemap items={basicItems} onSelectedChange={console.log} />
    </Fragment>
  );
};

const MediumWithKnobs = (): JSX.Element => {
  return (
    <Fragment>
      <CssBaseline />
      <Treemap items={smallItems} onSelectedChange={console.log} />
    </Fragment>
  );
};

const LargeWithKnobs = (): JSX.Element => {
  return (
    <Fragment>
      <CssBaseline />
      <Treemap items={largeItem} onSelectedChange={console.log} />
    </Fragment>
  );
};

const basic = (): JSX.Element => <SmallWithKnobs />;
const small = (): JSX.Element => <MediumWithKnobs />;
const large = (): JSX.Element => <LargeWithKnobs />;

storiesOf('component.Treemap', module)
  .add('Basic', basic)
  .add('Small Treemap', small)
  .add('Large Treemap', large);
