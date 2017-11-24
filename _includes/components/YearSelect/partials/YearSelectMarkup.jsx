import { h } from 'preact';


export default function YearSelectMarkup({ jsonData, open, updateItem, search }) {
  const items = jsonData.map((data) => {
    const Tag = data[2] === 'link' ? 'a' : 'span';
    const toggleOpen = () => updateItem('open', !open);
    const linkWithQuery = search ? `${data[1]}/?search=${search}` : data[1];

    return (
      <li
        className={`YearSelect-item${ data[2] === 'active' ? ' is-active' : '' }`}
        onClick={toggleOpen}
        >
        <Tag href={data[2] === 'active' ? null : linkWithQuery} className="YearSelect-link">{data[0]}</Tag>
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
