import { SvgIcon } from '@material-ui/core';
import React from 'react';
import Test from './Test';

const returnContent = (type) => {
  switch (type) {
    case 'Test': return <Test />;
    default: return null;
  }
};

const CustomIcon = ({ type, ...props }) => (
  <SvgIcon {...props}>
    {returnContent(type)}
  </SvgIcon>
);

export default CustomIcon;
