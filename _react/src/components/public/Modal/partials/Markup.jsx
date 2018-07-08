import React from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import ReactIcon from './../../../private/ReactIcon/index.jsx';


export default function Markup({ markup, title, closeModal, embed }) {
  const buildModal = () => {
    if (!markup || !title) {
      return null;
    }

    const innerCss = [
      'Modals-inner',
      embed && 'is-embed',
    ].filter(value => !!value).join(' ');

    return (
      <div className={innerCss}>
        <div className="Modals-overlay" onClick={closeModal} aria-hidden />
        <div className="Modals-boxWrap">
          <div className="Modals-box">
            <div className="Modals-heading">{title}</div>
            <div className="Modals-content">{markup}</div>
          </div>
          <button className="Modals-close" onClick={closeModal}>
            <ReactIcon type="close" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="Modals">
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
