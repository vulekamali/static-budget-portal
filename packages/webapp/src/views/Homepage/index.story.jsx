import React from 'react';
import { storiesOf } from '@storybook/react';
import Homepage from './index';


const beforeSpeechProps = {
  image: 'parliament',
  heading: 'New budget data will be available soon',
  subheading: 'The 2019 budget speech',
  buttons: {
    primary: {
      text: 'How to watch the speech',
    },
    secondary: {
      text: 'Get notified when data is live',
      link: '#',
    },
  },
  notice: 'The 2019/20 budget will be live on Vulekamali by 22 February 2019.',
};

const duringSpeechProps = {
  image: 'https://via.placeholder.com/150',
  heading: 'New budget data will go live soon',
  subheading: 'The 2019 budget speech has commenced',
  buttons: {
    primary: {
      text: 'Watch the speech',
      link: '#',
    },
    secondary: {
      text: 'Download budget resources',
      link: '#',
    },
  },
  notice: 'The 2019/20 budget will be live on Vulekamali by 22 February 2019.',
  callToAction: {
    subheading: 'Budget feature',
    heading: '25 Major infrastructure projects in South Africa',
    link: {
      text: 'Read this feature',
      link: '#',
    },
  },
  resources: [
    {
      heading: '2019 Budget Speech Documentation',
      size: '2.2MB',
      format: 'PDF',
      link: '#',
    },
    {
      heading: '2019 Budget Speech Documentation',
      size: '2.2MB',
      format: 'PDF',
      link: '#',
    },
    {
      heading: '2019 Budget Speech Documentation',
      size: '2.2MB',
      format: 'PDF',
      link: '#',
    },
    {
      heading: '2019 Budget Speech Documentation',
      size: '2.2MB',
      format: 'PDF',
      link: '#',
    },
  ],
};


const beforeSpeech = () => <Homepage {...beforeSpeechProps} />;
const duringSpeech = () => <Homepage {...duringSpeechProps} />;


storiesOf('view.Homepage', module)
  .add('Before Speech', beforeSpeech)
  .add('During Speech', duringSpeech);
