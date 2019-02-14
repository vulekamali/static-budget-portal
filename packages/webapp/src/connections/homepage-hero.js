import { createElement } from 'react';
import { render } from 'react-dom';
import Homepage from '../views/Homepage';


const props = {
  image: 'parliament',
  heading: 'New budget data will be available soon',
  subheading: 'The 2019 budget speech',
  buttons: {
    primary: {
      text: 'How to watch the speech',
      link: '#',
    },
    secondary: {
      text: 'Get notified when data is live',
      link: '#',
    },
  },
  notice: 'The 2019/20 budget will be live on Vulekamali by 22 February 2019.',
}


const node = document.querySelector('[data-webapp="homepage-hero"]')


const connection = () => {
  if (node) {
    render(createElement(Homepage, props), node);
  }
};


export default connection();
