import { h } from 'preact';
import Icon from './Icon.jsx';


export default function Form({ eventHandlers, keywords, selectedYear }) {
  const { initRequest, setFocus } = eventHandlers;

  const updateKeyword = event => initRequest(event.target.value);
  const addFocus = () => setFocus(true);
  const removeFocus = () => setFocus(false);
  const year = selectedYear === '2017-18' ? '' : `${selectedYear}/`;
  const searchUrl = `/static-budget-portal/${year}search-result/?search=${keywords}`;

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
        <a
          className="Search-button"
          href={searchUrl}
        >
          <Icon />
        </a>
      </div>
    </form>
  );
}
