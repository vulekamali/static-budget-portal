import { h, render } from 'preact';
import glossaryObject from './../../data/glossary.json';
import createGlossaryGroupedObject from './../../utilities/js/helpers/createGlossaryGroupedObject.js';
import Container from './partials/Container.jsx';


function Glossary() {
  const glossaryGroupedObject = createGlossaryGroupedObject(glossaryObject);
  const nodes = document.getElementsByClassName('Glossary');

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      render(<Container glossaryObject={glossaryGroupedObject} />, nodes[i]);
    }
  }
}


export default Glossary();
