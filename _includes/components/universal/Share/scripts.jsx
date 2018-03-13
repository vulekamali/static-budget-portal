import { h, render } from 'preact';
import Share from './index.jsx';


function scripts() {
  const nodes = document.getElementsByClassName('js-share');
  const nodesArray = [...nodes];

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      render(<Share />, node);
    });
  }
}


export default scripts();
