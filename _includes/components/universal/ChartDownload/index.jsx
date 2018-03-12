import { h } from 'preact';
import PseudoSelect from './../../universal/PseudoSelect/index.jsx';
import Icon from './../Icon/index.jsx';
import Modal from './../../universal/Modal/index.jsx';


export default function Markup(props) {
  const {
    options,
    chart,
    name,
    selectOpen,
    selected,
    modal,
    clickAction,
    canvasAction,
    closeModal,
    open,
    changeAction,
    items,
  } = props;

  return (
    <div >
      <Modal title="Share this link:" closeAction={closeModal} open={modal}>
        <a className="u-wordBreak u-wordBreak--breakAll" href={window.location.href}>
          {window.location.href}
        </a>
      </Modal>
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <span className="ChartDownload-title">Save or share</span>
      <div className="ChartDownload-select">
        <PseudoSelect
          name={`${name}-download-image`}
          open={open}
          changeAction={value => changeAction(value)}
          {...{ items, selected }}
        />
      </div>
      <div className="ChartDownload-button">
        <button onClick={clickAction} className="Button has-icon">
          <Icon type="download" size="small" />
        </button>
      </div>
    </div>
  );
}
