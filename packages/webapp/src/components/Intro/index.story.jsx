import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import Intro from './index';

const resources = {
    value: 372800000,
    consolidated: 37,
    change: -5,
    description: 'Pastry cupcake jelly jujubes. Jelly beans biscuit cheesecake. Danish tart gummi bears chupa chups sesame snaps. Fruitcake ice cream liquorice wafer. Dragée bear claw macaroon. Lemon drops caramels soufflé soufflé carrot cake tart. Fruitcake pastry cupcake halvah candy croissant chocolate pastry topping.'
  };

const basic = () => (
  <Fragment>
    <CssBaseline />
    <Intro {...resources} />
  </Fragment>
);

storiesOf('component.Intro', module)
  .add('Default', basic);
