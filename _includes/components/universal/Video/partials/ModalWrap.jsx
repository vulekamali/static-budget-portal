import { h } from 'preact';
import Icon from './../../Icon/index.jsx';
import { createModal } from './../../../header-and-footer/Modals/redux.js';


export default function ModalWrap() {
  return (
    <button className="Video-thumbnail">
      <div className="Video-iconWrap">
        <div className="Video-icon">
          <Icon type="play" size="large" />
        </div>
      </div>
      <img className="Video-preview" alt="" src="https://img.youtube.com/vi/zFalZt862hk/mqdefault.jpg" />
    </button>
  );
}


;