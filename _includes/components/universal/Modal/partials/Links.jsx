import { h } from 'preact';
import CloseIcon from './CloseIcon.jsx';


export default function Links({ actions = [], closeAction }) {
  return (
    <div className="Modal-links">

      <span className="Modal-linkWrap is-close" onClick={closeAction}>
        <span className="Modal-closeIcon">
          <CloseIcon />
        </span>
        <span className="Modal-link">
          Close
        </span>
      </span>

      {
        actions.map(({ url, title }) => {
          return (
            <a className="Modal-linkWrap" href={url}>
              <div className="Modal-link">{ title }</div>
            </a>
          );
        })
      }
    </div>
  );
}