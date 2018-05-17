import { h, render } from 'preact';
import SingleVideoContainer from './partials/SingleVideoContainer.jsx';
import initComponents from './../../../utilities/js/helpers/initComponents.js';
import getProp from './../../../utilities/js/helpers/getProp.js';


function scripts() {
  const createInstance = (node) => {
    const languages = getProp('languages', node, 'json');
    const title = getProp('title', node);
    const description = getProp('description', node);

    render(<SingleVideoContainer {...{ languages, description, title }} />, node);
  };

  initComponents('SingleVideo', createInstance, true);
}


export default scripts();
