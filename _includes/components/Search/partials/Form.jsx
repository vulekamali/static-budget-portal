import { h } from 'preact';
import Icon from './Icon.jsx';
import analyticsEvents from './../../../utilities/js/helpers/analyticsEvent.js';


export default function Form({ eventHandlers, keywords, selectedYear }) {
  const { initRequest, setFocus } = eventHandlers;

  const updateKeyword = event => initRequest(event.target.value);
  const addFocus = () => setFocus(true);
  const removeFocus = () => {
    analyticsEvents(
      'send',
      'event',
      'search',
      'unfocus',
      `${selectedYear}: ${keywords}`,
    );

    return setFocus(false);
  };
  const searchUrl = `/${selectedYear}/search-result`;

  return (
    <form className="Search-form" action={searchUrl} method="GET">
      <input
        name="search"
        className="Search-keywords"
        placeholder="Find departments"
        value={keywords}
        onInput={updateKeyword}
        onFocus={addFocus}
        onBlur={removeFocus}
        autoComplete="off"
      />

      <div className="Search-action">
        <button
          className="Search-button"
          type="submit"
          onClick={() => analyticsEvents(
            'send',
            'event',
            'search',
            'full-search',
            `${selectedYear}: ${keywords}`,
          )}
        >
          <Icon />
        </button>
      </div>
    </form>
  );
}
