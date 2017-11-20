import { h } from 'preact';


export default function Select({ items, state, eventHandlers }) {
  const list = items.map((item) => {
    const updateProvince = () => eventHandlers.updateFilter('province', item.value);

    return (
      <li
        className={`DeptSearch-item${item.value === state.value ? ' is-active' : ''}`}
        onClick={updateProvince}
      >
        <input className="DeptSearch-radio" type="radio" />
        <label className="DeptSearch-label">{item.title}</label>
      </li>
    )
  });

  return (
    <div className="DeptSearch-selectWrap">
      <ul className={`DeptSearch-select${state.open ? ' is-open': ''}`}>
        {list}
      </ul>
    </div>
  );
}
