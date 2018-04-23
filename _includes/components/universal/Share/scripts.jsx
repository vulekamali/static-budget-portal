import { h, render } from 'preact';
import Share from './index.jsx';
import getProp from './../../../utilities/js/helpers/getProp.js';
import createComponents from './../../../utilities/js/helpers/createComponents.js';


function scripts() {
  const createInstance = (node) => {
    const anchor = getProp('anchor', node);
    render(<Share {...{ anchor }} />, node);
  };

  createComponents('Share', createInstance);
}


export default scripts();
