import { h } from 'preact';
import CloseIcon from './CloseIcon.jsx';


export default function Content({ direction, title, description, closeAction, actions }) {
  return (
    <div>
      <div className="Tooltip-title">{ title }</div>
      <div className="Tooltip-text">{ description }</div>
      {
        actions.map((item) => {
          return (
            <div className="Tooltip-div">
              <a className="Tooltip-linkWrap" href={item.link}>{item.text}</a>
            </div>
          );
        })
      }
      <div className="Tooltip-div">
        <span className="Tooltip-linkWrap" onClick={closeAction}>
          <span>
            <CloseIcon />
          </span>
          <span className="Tooltip-link">Close</span>
        </span>
      </div>
      <div className={`Tooltip-triangleWrap${direction === 'down' ? ' is-down' : ''}`}>
        <div className={`Tooltip-triangle${direction === 'down' ? ' is-down' : ''}`}></div>
      </div>
    </div>
  )
}
