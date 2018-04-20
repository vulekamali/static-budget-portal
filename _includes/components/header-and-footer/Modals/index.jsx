import { h } from 'preact';
import CssTransitionGroup from 'preact-css-transition-group';
import Icon from './../../universal/Icon/index.jsx';


export default function Modal({ markup, title, closeModal }) {
  const buildModal = () => {
    if (!markup || !title) {
      return null;
    }

    return (
      <div className="Modal-inner">
        <div className="Modal-overlay" onClick={closeModal} aria-hidden />
        <div className="Modal-boxWrap">
          <div className="Modal-box">
            <div className="Modal-heading">{title}</div>
            <div className="Modal-content">{markup}</div>
          </div>
          <button className="Modal-close" onClick={closeModal}>
            <Icon type="close" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="Modal">
      <CssTransitionGroup
        transitionName="is"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {buildModal()}
      </CssTransitionGroup>
    </div>
  );
}
