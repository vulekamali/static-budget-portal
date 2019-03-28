import React from 'react';

const Chart = ({ data, selected }) => (
  <ul>
    {data.map(item => (
      <li
        key={item.department}
        onClick={selected}
      >
        <div>{item.department}</div>
        <div>{item.amount}</div>
        <div>{item.url}</div>
      </li>
    ))}
  </ul>
);

export default Chart;
