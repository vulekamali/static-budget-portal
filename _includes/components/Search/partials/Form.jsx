import { h } from 'preact';
import Icon from './Icon.jsx';


export default function Form({ eventHandlers, keywords, selectedYear }) {
  const { initRequest, setFocus } = eventHandlers;

  const updateKeyword = event => initRequest(event.target.value);
  const addFocus = () => setFocus(true);
  const removeFocus = () => setFocus(false);
  const searchUrl = `/${selectedYear}/search-result/`;

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
        <button className="Search-button" type="submit" onClick={() => console.log(searchUrl)}>
          <Icon />
        </button>
      </div>
    </form>
  );
}
