import { h } from 'preact';
import PseudoSelect from './../../universal/PseudoSelect/index.jsx';
import Icon from './../Icon/index.jsx';


export default function ChartDownload(props) {
  const {
    selected,
    open,
    items,
    changeAction,
    name,
    clickAction,
    canvasAction,
  } = props;

  return (
    <div className="Graph-download">
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <span className="Graph-downloadTitle">Save or share</span>
      <div className="Graph-downloadSelect">
        <PseudoSelect
          name="download-image"
          open={open}
          changeAction={value => changeAction(value)}
          {...{ items, selected }}
        />
      </div>
      <div className="Graph-downloadButton">
        <button onClick={clickAction} className="Button has-icon">
          <Icon type="download" size="small" />
        </button>
      </div>
    </div>
  );
}
