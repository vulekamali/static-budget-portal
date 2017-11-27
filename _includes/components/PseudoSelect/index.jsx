import { h } from 'preact';

export default function PseudoSelect({ open, items, changeAction, openAction, name, property, block, }) {
  const radioChange = event => changeAction(event.target.value);

  const renderList = items.map(({ value: itemValue, title }) => {
    const id = `pseudo-select-${name}-${itemValue}`;

    return (
      <li className={`PseudoSelect-item${property === itemValue ? ' is-active' : ''}`}>
        <label className="PseudoSelect-label" htmlFor={id}>
          <input
            {...{ id, name }}
            value={itemValue}
            type="radio"
            checked={property === itemValue}
            onClick={radioChange}
            className="PseudoSelect-radio"
          />
          <span>{ title }</span>
        </label>
      </li>
    );
  });

  return (
    <div className="PseudoSelect">
      <ul className={`PseudoSelect-list${open ? ' is-open' : ''}${block ? ' PseudoSelect-list--block' : ''}`}>
        {renderList}
      </ul>
    </div>
  );
}
