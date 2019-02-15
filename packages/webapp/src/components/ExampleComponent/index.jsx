import React from 'react';
import t from 'prop-types';
import Button from '@material-ui/core/Button';


const ExampleComponent = ({ text }) => (
  <Button variant="contained">
    {text}
  </Button>
);


export default ExampleComponent;


ExampleComponent.propTypes = {
  /** Text that should go inside button */
  text: t.string.isRequired,
};
