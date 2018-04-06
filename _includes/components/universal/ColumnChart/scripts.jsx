import { h, render } from 'preact';
import getProp from './../../../utilities/js/helpers/getProp.js';


function scripts() {
  const nodesList = document.getElementsByClassName('js-initColumnChart');

  for (let i = 0; i < nodesList.length; i++) {
    const node = nodesList[i];
    const items = getProp('items', node, 'json');
    const width = getProp('width', node, 'int');
  }
}


export default scripts();
