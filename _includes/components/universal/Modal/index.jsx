
import { h } from 'preact';
import Box from './partials/Box.jsx';


export default function Modal({ block, children, forceWrap, title, description, actions, down, open, openAction, closeAction }) {

  return (
    <span className={`Modal${block ? ' is-block' : ''}`}>
      <div className="Modal-trigger" onClick={openAction}>
        {children}
      </div>
      <div className={`Modal-boxWrap${open ? ' is-open' : ''}`}>
        <div className="Modal-modalCover" onClick={closeAction} />
        <Box {...{ title, description, actions, down, closeAction, forceWrap }} />
      </div>
    </span>
  );
}