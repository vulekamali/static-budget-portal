import { h } from 'preact';


export default function Radios({ items, selected, changeAction, name }) {
  const keys = Object.keys(items);

  return (
    <ul className="Radios">
      {
        keys.map((key, index) => {
          return (
            <li className="Radios-itemWrap" key={key}>
              <label htmlFor={`${name}-${index}`}>
                <input
                  className="Radios-input"
                  type="radio"
                  id={`${name}-${index}`}
                  value={items[key]}
                  checked={items[key] === selected}
                  onChange={event => changeAction(event.target.value)}
                  {...{ name }}
                />
                <span className="Radios-label">{key}</span>
              </label>
            </li>
          );
        })
      }
    </ul>
  );
}