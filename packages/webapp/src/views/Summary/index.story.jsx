import React from 'react';
import { storiesOf } from '@storybook/react';
import Summary from './';


const props = {
  year: '2018-19',
  items: [
    {
      title: 'Admin',
      amount: 500,
    },
    {
      title: 'Education',
      amount: 700,
    }
  ],
  resources: {
    value: 2000,
    consolidated: 25
  },
  description: 'Charlie and the Chocolate Factory umpa lumpa'
};


const basic = () => <Summary {...props} />;


storiesOf('view.Summary', module)
  .add('Default', basic)
