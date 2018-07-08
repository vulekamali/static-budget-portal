import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';


export default function ReactPlaceholder({ utils, height }) {
  const className = [
    'ReactPlaceholder',
    utils,
  ].filter(value => !!value).join(' ');

  const style = height ? { height } : {};

  return <div {...{ className, style }}>&nbsp;</div>;
}


ReactPlaceholder.propTypes = {
  utils: PropTypes.string,
  height: PropTypes.number,
};


ReactPlaceholder.defaultProps = {
  utils: null,
  height: null,
};

