import { h } from 'preact';


export default function YearSelectMarkup({ open, updateItem, search }) {

const jsonData = [
    {
      "direct": false,
      "url": "/2015-16/national/departments/national-treasury",
      "name": "2015-16",
      "active": false
    },
    {
      "direct": true,
      "url": "/2016-17/national/departments/national-treasury",
      "name": "2016-17",
      "active": false
    },
    {
      "direct": true,
      "url": "/2017-18/national/departments/national-treasury",
      "name": "2017-18",
      "active": true
    }
  ]

  const items = jsonData.map((data) => {
    const Tag = data.active || data.direct === false ? 'span' : 'a';
    const toggleOpen = () => updateItem('open', !open);
    const linkWithQuery = search ? `${data.url}/?search=${search}` : data.url;

    return (
      <li
        className={`YearSelect-item${ data.active ? ' is-active' : '' }`}
        onClick={toggleOpen}
        >
        <Tag href={data.active || data.direct === false ? null : linkWithQuery} className="YearSelect-link">{data.name}</Tag>
      </li>
    );
  });

  return (
    <div className="YearSelect-wrap">
      <h2 className="YearSelect-title">Show data for a financial year</h2>
      <div className="YearSelect-content">
        <ul className={`YearSelect-bar${open ? ' is-open' : ''}`}>
          {items}
        </ul>
      </div>
    </div>
  );
}
