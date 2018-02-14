import { h } from 'preact';
import trimValues from './trimValues.js';


export default function Item({ title, value }) {
  console.log(value);

  return (
    <div className="Revenue-itemWrap">
      <div className="Revenue-item">
        <div className="Revenue-title">{title}</div>
        { value !== null ? <div className="Revenue-value">R{trimValues(value)}</div> : null }
      </div>
    </div>
  );
}
