import React from 'react';

const Chart = ({ data }) => (
  <ul>
    {data.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

export default Chart;
