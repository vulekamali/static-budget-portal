import React from 'react';
import { storiesOf } from '@storybook/react';
import Intro from './index';

const resources = {
    value: 372.8,
    consolidated: 18,
    change: 4,
    description: 'Pastry cupcake jelly jujubes. Jelly beans biscuit cheesecake. Danish tart gummi bears chupa chups sesame snaps. Fruitcake ice cream liquorice wafer. Dragée bear claw macaroon. Lemon drops caramels soufflé soufflé carrot cake tart. Fruitcake pastry cupcake halvah candy croissant chocolate pastry topping.'
  };

const basic = () => <Intro {...{ resources }} />;

storiesOf('component.Intro', module)
  .add('Default', basic);
