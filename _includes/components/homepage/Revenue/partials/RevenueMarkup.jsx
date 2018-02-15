import { h } from 'preact';
import Item from './Item.jsx';


const icon = (
  <svg className="Icon is-12" width="0" height="0" xmlns="http://www.w3.org/2000/svg" viewBox="157 347 100 100">
    <path d="M250.5 402.4a2 2 0 0 0-1.9-1.3h-22.8v-52c0-1.2-1-2.1-2.1-2.1h-33.3a2 2 0 0 0-2.1 2v52.1h-23a2 2 0 0 0-1.4 3.6l41.6 41.7c.4.4.9.6 1.4.6.6 0 1.1-.2 1.5-.6l41.7-41.7a2 2 0 0 0 .4-2.3z" />
  </svg>
);


export default function RevenueMarkup({ items, link }) {
  const keys = Object.keys(items);

  const linkMarkup = (
    <div className="Revenue-linkWrap">
      <a href={link} className="Revenue-link">
        <span className="Revenue-icon">{icon}</span>
        <span>Download Estimates of National Revenue (XLSX)</span>
      </a>
    </div>
  );

  return (
    <div className="Revenue-box">
      {keys.map(key => <Item title={key} value={items[key]} />)}
      { link ? linkMarkup : null }
    </div>
  );
}
