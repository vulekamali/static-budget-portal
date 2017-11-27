import { h, render } from 'preact';
import ShareContainer from './partials/ShareContainer.jsx';


function Share() {
  const nodes = document.getElementsByClassName('Share');
  const nodesArray = [...nodes];

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      render(<ShareContainer />, node);
    });
  }
}


export default Share();
