import { h } from 'preact';
import Box from './partials/Box.jsx';


export default function Tooltip({ children, title, description, actions, year }) {
  return (
    <span className="Tooltip">
      <div className="Tooltip-trigger">
        {children}
      </div>
      <div className="Tooltip-boxWrap">
        <div className="Tooltip-modalCover" />
        <Box {...{ title, description, actions, year }} />
      </div>
    </span>
  );
}
