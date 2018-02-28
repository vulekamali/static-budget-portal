import { h, render } from 'preact';
import VideoContainer from './partials/VideoContainer.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function Videos() {
  const nodes = document.getElementsByClassName('Video');

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      const component = nodes[i];
      const jsonData = JSON.parse(decodeHtmlEntities(component.getAttribute('data-json')));
      render(<VideoContainer {...{ jsonData }} />, component);
    }
  }
}


export default Videos();
