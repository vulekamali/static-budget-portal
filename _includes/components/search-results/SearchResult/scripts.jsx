import { h, render } from 'preact';
import SearchResultContainer from './partials/SearchResultContainer.jsx';
import initComponents from './../../../utilities/js/helpers/initComponents.js';

function scripts() {
  const { search: phrase } = window.vulekamali.qs;

  const createInstance = (node) => {
    const year = node.getAttribute('data-year');
    render(<SearchResultContainer {...{ year, phrase }} />, node);
  };

  initComponents('SearchResult', createInstance, true);
}


export default scripts();
