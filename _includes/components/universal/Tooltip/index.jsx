import { h } from 'preact';
import Box from './partials/Box.jsx';


export default function Tooltip({ block, openAction, closeAction, title, description, underline, children, open, direction, actions, important }) {
  return (
    <span className={`Tooltip${block ? ' is-block': ''}`} >
      {underline ?
        <span onClick={openAction} className="Tooltip-phrase">{children}</span> :
        <span onClick={openAction}>{children}</span>
      }
      <Box {...{ open, direction, actions, title, description, important, closeAction }} />
    </span>
  );
}
