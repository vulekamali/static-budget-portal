import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'


export default function ReactBevel({ children, colour, utils }) {
  const rootCss = [
    'ReactBevel',
    colour === 'green' && 'is-green',
    colour === 'purple' && 'is-purple',
    utils,
  ].filter(value => !!value).join(' ');

  return (
    <div className={rootCss}>
      {children}
    </div>
  );
}


ReactBevel.propTypes = {
  children: PropTypes.element.isRequired,
  utils: PropTypes.string,
  colour: PropTypes.oneOf(['grey', 'green', 'purple'])
}


ReactBevel.defaultProps = {
  colour: 'grey',
  util: '',
}