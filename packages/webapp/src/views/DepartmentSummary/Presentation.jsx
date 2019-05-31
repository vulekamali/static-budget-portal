import React from 'react';

const Presentation = (props = {}) => (
  <code>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </code>
);

export default Presentation;
