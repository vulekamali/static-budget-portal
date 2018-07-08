import React from 'react';
import './styles.css';


export default function Markup ({ selected, onChange: rawOnChange, options }) {
  const onChange = event => rawOnChange(event.target.value);

  return (
    <select className="ReactDropdown" value={selected} {...{ onChange }}>
      {options.map(value => <option key={value} {...{ value }}>{value}</option>)}
    </select>
  )
}