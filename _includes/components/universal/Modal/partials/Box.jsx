import { h } from 'preact';
import Links from './Links.jsx';


export default function Box({ title, description, actions, down, closeAction }) {
  return (
    <div className="Modal-box">
      <div className={`Modal-content${down ? ' is-down' : ''}`}>
        <div className="Modal-shadowBox">
          <div className="Modal-infoBox">
            <div className="Modal-title">{title}</div>
            <div className="Modal-text">{description}</div>
            <Links {...{ actions, closeAction }} />
          </div>
          <div className={`Modal-triangle${down ? ' is-down' : ''}`} />
        </div>
      </div>
    </div>
  );
}