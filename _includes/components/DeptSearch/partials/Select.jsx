import { h } from 'preact';
import PropTypes from 'prop-types';


export default function Select({ items, state, update, open, filter }) {
  const list = items.map((item) => {
    const updateItem = () => update(filter, item.value);

    return (
      <li className={`DeptSearch-item${item.value === state ? ' is-active' : ''}`}>
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
            onClick={updateItem}
          />
          {item.title}
        </label>
      </li>
    );
  });

  return (
    <div className="DeptSearch-selectWrap">
      <ul className={`DeptSearch-select${filter === open ? ' is-open' : ''}`}>
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
