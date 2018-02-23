import { h } from 'preact';
import CloseIcon from './partials/CloseIcon.jsx';


export default function Modal({ children, title, open, closeAction }) {
  return (
    <span className="Modal">
      <div className={`Modal-boxWrap${open ? ' is-open' : ''}`}>
        <div className="Modal-modalCover" onClick={closeAction} />
        <div className="Modal-box">
          <div className="Modal-content">
            <div className="Modal-shadowBox">
              <div className="Modal-infoBox">
                <div className="Modal-title">{title}</div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
