import React from 'react';
import { storiesOf } from '@storybook/react';
import SectionHeading from './index';

const share = () => <SectionHeading title='Provincial Budget Summary' share />;
const noShare = () => <SectionHeading title='Provincial Budget Summary' />;
const shareString = () => <SectionHeading title='Provincial Budget Summary' share='addTextHere' />;


storiesOf('component.SectionHeading', module)
  .add('Share', share)
  .add('No Share', noShare)
  .add('Share is a String', shareString)
