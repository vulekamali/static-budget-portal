import { h } from 'preact';
import Content from './Content.jsx';


export default function Box({ open, title, description, direction, actions, important, closeAction }) {
  return (
    <div className={`Tooltip-boxWrap${open ? ' is-open' : ''}${important ? ' is-important' : ''}`}>
      <div className="Tooltip-modalCover" onClick={closeAction} />
      <div className="Tooltip-box">
        <div className={`Tooltip-content${direction === 'down' ? ' is-down' : ''}`}>
          <div className="Tooltip-shadowBox">
            <Content {...{ direction, actions, title, description, closeAction }} />
          </div>
        </div>
      </div>
    </div>
  );
}
