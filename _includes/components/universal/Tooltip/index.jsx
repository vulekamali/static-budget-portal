import { h } from 'preact';
import Box from './partials/Box.jsx';


export default function Tooltip({ block, children, title, description, actions, year, down, open, openAction, closeAction }) {

  return (
    <span className={`Tooltip${block ? ' is-block' : ''}`}>
      <div className="Tooltip-trigger" onClick={openAction}>
        {children}
      </div>
      <div onClick={closeAction} className={`Tooltip-boxWrap${open ? ' is-open' : ''}`}>
        <div className="Tooltip-modalCover" />
        <Box {...{ title, description, actions, year, down, closeAction }} />
      </div>
    </span>
  );
}
