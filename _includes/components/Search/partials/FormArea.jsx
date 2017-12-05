import { h } from 'preact';
import PropTypes from 'prop-types';
import Icon from './Icon.jsx';
import analyticsEvents from './../../../utilities/js/helpers/analyticsEvent.js';


export default function FormArea({ setFocus, findSuggestions, currentKeywords, selectedYear }) {
  // ...
  const searchUrl = `/${selectedYear}/search-result`;

  const updateKeyword = event => findSuggestions(event.target.value);
  const addFocus = () => setFocus(true);

  const removeFocus = () => {
    analyticsEvents(
      'send',
      'event',
      'search',
      'unfocus',
      `${selectedYear}: ${currentKeywords}`,
    );

    return setFocus(false);
  };


  // ...
  return (
    <form className="Search-form" action={searchUrl} method="GET">
      <input type="hidden" name="search_type" value="full-search" />
      <input type="hidden" name="search_string" value={currentKeywords} />

      <input
        autoComplete="off"
        className="Search-keywords"
        name="search"
        onBlur={removeFocus}
        onFocus={addFocus}
        onInput={updateKeyword}
        placeholder="Find departments"
        value={currentKeywords}
      />

      <div className="Search-action">
        <button className="Search-button" type="submit">
          <Icon />
        </button>
      </div>
    </form>
  );
}


FormArea.propTypes = {
  currentKeywords: PropTypes.string.isRequired,
  findSuggestions: PropTypes.func.isRequired,
  selectedYear: PropTypes.string.isRequired,
  setFocus: PropTypes.func.isRequired,
};
