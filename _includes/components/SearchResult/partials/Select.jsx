import { h } from 'preact';


export default function Select({ items, state, updateFilter }) {
  const list = items.map((item) => {
    const updateProvince = () => updateFilter('province', item.value);

    return (
      <li
        className={`SearchResult-item${item.value === state.value ? ' is-active' : ''}`}
        onClick={updateProvince}
      >
        <input className="SearchResult-radio" type="radio" />
        <label className="SearchResult-label">{item.title}</label>
      </li>
    )
  });

  return (
    <div className="SearchResult-selectWrap">
      <ul className={`SearchResult-select${state.open ? ' is-open': ''}`}>
        {list}
      </ul>
    </div>
  );
}
