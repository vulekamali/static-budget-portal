import { h } from 'preact';
import CloseIcon from './CloseIcon.jsx';


export default function Links({ actions, year }) {
  return (
    <div className="Tooltip-links">

      <span className="Tooltip-linkWrap is-close">
        <span className="Tooltip-closeIcon">
          <CloseIcon />
        </span>
        <span className="Tooltip-link">
          Close
        </span>
      </span>

      {
        actions.map(({ url, title }) => {
          return (
            <a className="Tooltip-linkWrap" href={`/${year}/${url}`}>
              <div className="Tooltip-link">{ title }</div>
            </a>
          );
        })
      }

      <div className="Tooltip-triangle" />
    </div>
  );
}
