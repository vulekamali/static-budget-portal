import React from 'react';
import { storiesOf } from '@storybook/react';
// import TreeMap from './index';

const data = [
  {
    "amount": 6408750000,
    "budget_phase": "Main appropriation",
    "financial_year": 2018,
    "name": "Agriculture, Forestry and Fisheries",
    "detail": "fake_url_path_1"
  },
  {
    "amount": 4809420000,
    "budget_phase": "Main appropriation",
    "financial_year": 2018,
    "name": "Health",
    "detail": "fake_url_path_2"
  },
  {
    "amount": 3653650000,
    "budget_phase": "Main appropriation",
    "financial_year": 2018,
    "name": "Police",
    "detail": "fake_url_path_3"
  }
]

const basic = () => <ResourceList data={data} />;


storiesOf('component.Treemap', module)
  .add('Default', basic)
