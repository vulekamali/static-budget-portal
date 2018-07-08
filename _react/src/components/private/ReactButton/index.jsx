import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'


const isInternal = path => /^\/(?!\/)/.test(path);


export default function ReactButton(props = {}) {
  const {
    onClick,
    children,
    theme,
    inline,
    size,
    utils,
  } = props;

  const rootCss = [
    'ReactButton',
    inline && 'is-inline',
    size === 'small' && 'is-small',
    size === 'large' && 'is-large',
    theme === 'secondary' && 'is-secondary',
    theme === 'invisible' && 'is-invisible', 
    utils,
  ].filter(value => !!value).join(' ');

  if (typeof onClick === 'string') {
      return (
        <a href={onClick}
        className={rootCss}
        target={!isInternal(onClick) && '_blank'}
      >
        {children}
      </a>
      )
  }

  return (
    <button
      className={rootCss}
      {...{ onClick }}
    >
      {children}
    </button>
  );
}


ReactButton.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]).isRequired,
  onClick: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired,
  inline: PropTypes.bool,
  theme: PropTypes.oneOf(['default', 'secondary', 'invisible']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  utils: PropTypes.string,
}

ReactButton.defaultProps = {
  theme: 'default',
  inline: false,
  size: 'medium',
  utils: '',
}