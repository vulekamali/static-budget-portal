import { h, render } from 'preact';
import BarChart from './index.jsx';
import getProps from './../../../utilities/js/helpers/getProp.js';


function scripts() {
  const nodesList = document.getElementsByClassName('js-initBarChart');

  for (let i = 0; i < nodesList.length; i++) {
    const node = nodesList[i];
    const items = getProps('values', node, 'json');
    const guides = getProps('guides', node, 'bool');
    const hover = getProps('hover', node, 'bool');
    const width = getProps('width', node, 'int');
    const scale = getProps('scale', node, 'int');
    const rawDownload = getProps('download', node, 'json');

    const downloadHasProps = rawDownload.heading && rawDownload.subHeading && rawDownload.type;
    const download = downloadHasProps ? rawDownload : null;

    render(
      <BarChart {...{ items, width, hover, guides, download, scale }} />,
      node,
    );
  }
}


export default scripts();
