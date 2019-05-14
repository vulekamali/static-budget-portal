/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import FocusArea from '.';
import allComponents from './storybookData/allComponents';

// case where every component is showing
const item = value => allComponents(value);

const items = [1, 2, 3, 4, 5].map(value => {
  return item(value);
});

const initialSelectedNational = {
  name: 'National Department Contributions',
  value: 92348259852,
  url: null,
  color: 'rgba(0, 0, 0, 0.1)',
};

const initialSelectedProvincial = {
  name: 'Provincial Department Contributions',
  value: 87528439188,
  url: null,
  color: 'rgba(0, 0, 0, 0.1)',
};

const props = {
  items,
  department: 2,
  initialSelectedNational,
  initialSelectedProvincial,
};

const basic = () => <FocusArea {...props} />;

storiesOf('view.FocusArea', module).add('Default', basic);
