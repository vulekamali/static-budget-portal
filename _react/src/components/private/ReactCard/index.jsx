import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'


export default function ReactCard({ children, preview, utils, auto }) {
  const rootCss = [
    'ReactCard',
    auto && 'is-autoHeight',
    utils,
  ].filter(value => !!value).join(' ');


  const checkIfColumns = (preview, content) => {
    if (!preview) {
      return content;
    }
    
    return (
      <div className="ReactCard-columns">
        <div className="ReactCard-preview">
          {preview}
        </div>
        <div className="ReactCard-info">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className={rootCss}>
      {checkIfColumns(preview, children)}
    </div>
  );
}


ReactCard.propTypes = {
  children: PropTypes.node.isRequired,
  preview: PropTypes.element,
  bevel: PropTypes.oneOf(['grey', 'green', 'purple'])
}


ReactCard.defaultProps = {
  preview: null,
  bevel: null,
}