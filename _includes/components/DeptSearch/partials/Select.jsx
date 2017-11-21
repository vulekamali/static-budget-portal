import { h } from 'preact';
import PropTypes from 'prop-types';


export default function Select({ items, state, update, filter }) {
  const list = items.map((item) => {
    const updateItem = () => update(filter, item.value);

    return (
      <li
        className={`DeptSearch-item${item.value === state.value ? ' is-active' : ''}`}
        onClick={updateItem}
        tabIndex={1}
      >
        <label
          htmlFor={`filter-${filter}-${item.value}`}
          className="DeptSearch-label"
        >
          <input
            className="DeptSearch-radio"
            type="radio"
            value={item.value}
            name={`filter-${filter}`}
            id={`filter-${filter}-${item.value}`}
          />
          {item.title}
        </label>
      </li>
    );
  });

  return (
    <div className="DeptSearch-selectWrap">
      <ul className={`DeptSearch-select${state.open ? ' is-open' : ''}`}>
        {list}
      </ul>
    </div>
  );
}


Select.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.bool,
      value: PropTypes.string,
    }),
  ).isRequired,
  state: PropTypes.shape({
    open: PropTypes.bool,
    value: PropTypes.string,
  }).isRequired,
  action: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
