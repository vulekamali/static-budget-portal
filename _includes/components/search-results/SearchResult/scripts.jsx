import { h, render } from 'preact';
import { parse } from 'query-string';
import SearchResultContainer from './partials/SearchResultContainer.jsx';
import initComponents from './../../../utilities/js/helpers/initComponents.js';


function scripts() {
  const { search: phrase } = window.vulekamali.qs;

  const createInstance = (node) => {
    const year = node.getAttribute('data-year');
    const rootNode = node;
    const { view } = parse(location.search);
    render(<SearchResultContainer {...{ year, view, phrase, rootNode }} />, node);
  };

  initComponents('SearchResult', createInstance, true);
}


export default scripts();
