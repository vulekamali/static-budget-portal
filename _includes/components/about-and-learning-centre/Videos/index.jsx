import { h, render } from 'preact';
import VideosContainer from './partials/VideosContainer.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function Videos() {
  const nodes = document.getElementsByClassName('Videos');

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      const items = JSON.parse(decodeHtmlEntities(nodes[i].getAttribute('data-items'))).data;
      render(<VideosContainer {...{ items }} />, nodes[i]);
    }
  }
}


export default Videos();
