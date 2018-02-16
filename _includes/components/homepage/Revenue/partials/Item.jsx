import { h } from 'preact';
import trimValues from './trimValues.js';


export default function Item({ year, title, value }) {
  return (
    <div className="Revenue-itemWrap">
      <a href={`/${year}/search-result?search_type=full-search&search=${encodeURI(title.replace(/[^\w|\s]/g, ' '))}`} className="Revenue-item">
        <div className="Revenue-title">{title}</div>
        { value !== null ? <div className="Revenue-value">R{trimValues(value)}</div> : null }
      </a>
    </div>
  );
}
