import { h } from 'preact';
import Icon from './Icon.jsx';


export default function Form({ eventHandlers, keywords }) {
  const { updateItem, initRequest } = eventHandlers;

  const updateKeyword = event => initRequest(event.target.value);
  const addFocus = () => updateItem('focus', true);
  const removeFocus = () => updateItem('focus', false);

  return (
    <form className="Search-form">
      <input
        className="Search-keywords"
        placeholder="Find departments"
        value={keywords}
        onInput={updateKeyword}
        onFocus={addFocus}
        onBlur={removeFocus}
      />

      <div className="Search-action">
        <button className="Search-button">
          <Icon />
        </button>
      </div>
    </form>
  );
}
