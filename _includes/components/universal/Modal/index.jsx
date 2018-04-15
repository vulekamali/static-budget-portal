import { h } from 'preact';
import CssTransitionGroup from 'preact-css-transition-group';
import PropTypes from 'prop-types';
import Icon from './../Icon/index.jsx';


export default function Modal({ children, title, open, closeAction }) {
  const modal = (
    <div className="Modal-inner">
      <div className="Modal-overlay" onClick={closeAction} aria-hidden />
      <div className="Modal-boxWrap">
        <div className="Modal-box">
          <div className="Modal-heading">{ title }</div>
          <div className="Modal-content">{ children }</div>
        </div>
        <button className="Modal-close" onClick={closeAction}>
          <Icon type="close" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="Modal">
      <CssTransitionGroup
        transitionName="is"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {open ? modal : null }
      </CssTransitionGroup>
    </div>
  );
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  closeAction: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};