import React from 'react';
import { storiesOf } from '@storybook/react';
import Preview from './';

const item = (value) => ({
  description: 'Pastry cupcake jelly jujubes. Jelly beans biscuit cheesecake. Danish tart gummi bears chupa chups sesame snaps. Fruitcake ice cream liquorice wafer. Dragée bear claw macaroon. Lemon drops caramels soufflé soufflé carrot cake tart.',
  title: 'Something',
  id: value,
  resources: {
      value: 372800000,
      consolidated: 37
    },
  items: [
    {
      title: 'Administration',
      amount: 695320000000
    },
    {
      title: 'Economic Statistics',
      amount: 493210000000
    },
    {
      title: 'Population & Social Statistics',
      amount: 202300000000
    },
    {
      title: 'Methodology, Standards & Reasearch',
      amount: 67400000000
    },
    {
      title: 'Statistical Support & Informatics',
      amount: 267100000000
    },
    {
      title: 'Statistical Collection & Outreach',
      amount: 608000000000
    },
    {
      title: 'Survey Operations',
      amount: 194740000000
    }
  ],
  focus_areas: [
    {
      slug: 'general-public-services',
      title: 'General Public Services',
      url: '2019-20/focus/general-public-services'
    },
    {
      slug: 'economic-development',
      title: 'Economic Development',
      url: '2019-20/focus/economic-development'
    },
    {
      slug: 'community-development',
      title: 'Community Development',
      url: '2019-20/focus/community-development'
    }
  ]
});

const items = [1,2,3,4,5].map((value) => item(value));

const props = {
  items,
  department: 2
}


const basic = () => <Preview {...props} />;


storiesOf('views.Preview', module)
  .add('Default', basic)
