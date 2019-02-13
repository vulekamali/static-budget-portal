import { configure } from '@storybook/react';


function loadStories() {
  require('../src/views/Homepage/index.story.jsx');
}


configure(loadStories, module);