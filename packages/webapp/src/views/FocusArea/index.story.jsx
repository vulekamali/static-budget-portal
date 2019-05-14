/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import FocusAreaTemp from '.';
import allComponents from './storybookData/allComponents';
import provincesNull from './storybookData/provincesNull';
import provincesEmpty from './storybookData/provincesEmpty';
import noEquitableShare from './storybookData/noEquitableShare';

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

// case where initialSelectedProvincial is null
const propsNoInitialSelectedProvincial = {
  items,
  department: 2,
  initialSelectedNational,
};

// case where provinces list is null
const itemNull = value => provincesNull(value);

const itemsNull = [1, 2, 3, 4, 5].map(value => {
  return itemNull(value);
});

const propsItemsNull = {
  items: itemsNull,
  department: 2,
  initialSelectedNational,
  initialSelectedProvincial,
};

// case where provinces list is an empty object
const itemEmpty = value => provincesEmpty(value);

const itemsEmpty = [1, 2, 3, 4, 5].map(value => {
  return itemEmpty(value);
});

const propsitemsEmpty = {
  items: itemsEmpty,
  department: 2,
  initialSelectedNational,
  initialSelectedProvincial,
};

// case where every equitable share is excluded from National Treemap footer
const itemNoEquitableShare = value => noEquitableShare(value);

const itemsNoEquitableShare = [1, 2, 3, 4, 5].map(value => {
  return itemNoEquitableShare(value);
});

const propsNoEquitableShare = {
  items: itemsNoEquitableShare,
  department: 2,
  initialSelectedNational,
  initialSelectedProvincial,
};

const basic = () => <FocusAreaTemp {...props} />;
const NoInitialSelectedProvincial = () => <FocusAreaTemp {...propsNoInitialSelectedProvincial} />;
const ItemsNull = () => <FocusAreaTemp {...propsItemsNull} />;
const ItemsEmpty = () => <FocusAreaTemp {...propsitemsEmpty} />;
const NoEquitableShareFooter = () => <FocusAreaTemp {...propsNoEquitableShare} />;

storiesOf('view.FocusAreaTemp', module)
  .add('Default', basic)
  .add('NoInitialSelectedProvincial', NoInitialSelectedProvincial)
  .add('ItemsNull', ItemsNull)
  .add('ItemsEmpty', ItemsEmpty)
  .add('NoEquitableShareFooter', NoEquitableShareFooter);
