import React from 'react';
import { storiesOf } from '@storybook/react';
import ChartSection from './';

const data = [
  {
    name: "Police",
    value: "1234567",
    url: "#1",
    color: "#FFD54F"
  },
  {
    name: "Agriculture",
    value: "1463726",
    url: "#2",
    color: "#E57373"
  },
  {
    name: "Education",
    value: "6539209",
    url: "#3",
    color: "#4DD0E1"
  },
]

const initialSelected = {
  name: "National Budget Summary",
  value: "92348259852",
  url: null,
  color: "#D8D8D8"
}

const Chart = ({ onSelectedChange }) => (
  <ul>
    {data.map(item => (
      <li
        key={item.department}
        onClick={() => onSelectedChange(item)}
      >
        <div>{item.name}</div>
        <div>{item.value}</div>
        <div>{item.url}</div>
      </li>
    ))}
  </ul>
);

const basic = () => <ChartSection {...{ data, initialSelected }} chart={Chart} />;


storiesOf('component.ChartSection', module)
  .add('Default', basic)
