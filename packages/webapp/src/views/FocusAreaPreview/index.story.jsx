import React from 'react';
import { storiesOf } from '@storybook/react';
import FocusAreaPreview from './';


const props = {
  resources: {
      value: 372800000,
      consolidated: 37,
      change: -5,
    },
  items: [
    {
      name: 'Administration',
      amount: 695320000000,
      url: null
    },
    {
      name: 'Economic Statistics',
      amount: 493210000000,
      url: null
    },
    {
      name: 'Population & Social Statistics',
      amount: 202300000000,
      url: null
    },
    {
      name: 'Methodology, Standards & Reasearch',
      amount: 67400000000,
      url: null
    },
    {
      name: 'Statistical Support & Informatics',
      amount: 267100000000,
      url: null
    },
    {
      name: 'Statistical Collection & Outreach',
      amount: 608000000000,
      url: null
    },
    {
      name: 'Survey Operations',
      amount: 194740000000,
      url: null
    }
  ],
  description: 'Pastry cupcake jelly jujubes. Jelly beans biscuit cheesecake. Danish tart gummi bears chupa chups sesame snaps. Fruitcake ice cream liquorice wafer. Dragée bear claw macaroon. Lemon drops caramels soufflé soufflé carrot cake tart.',
  government: 'western-cape',
  year: '2019-20',
  initialSelected: {
    name: "Total",
    value: "92348259852",
    url: null,
    color: "#D8D8D8"
  }
};


const basic = () => <FocusAreaPreview {...props} />;


storiesOf('view.FocusAreaPreview', module)
  .add('Default', basic)
