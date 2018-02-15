import { h, render } from 'preact';
import VideoContainer from './partials/VideoContainer.jsx';


function Videos() {
  const nodes = document.getElementsByClassName('Video');

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      const component = nodes[i];
      const jsonData = JSON.parse(component.getAttribute('data-json'));
      render(<VideoContainer {...{ jsonData }} />, component);
    }
  }
}


export default Videos();
