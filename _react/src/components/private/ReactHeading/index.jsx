import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'


export default function ReactHeading({ children, level = 6 }) {
  const Tag = `h${level}`;
  return <Tag className="ReactHeading">{children}</Tag>;
}


ReactHeading.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.string,
}


ReactHeading.defaultProps = {
  level: '6',
}