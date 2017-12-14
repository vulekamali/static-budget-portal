import glossaryObject from './../../data/glossary.json';
import createGlossaryGroupedObject from './../../utilities/js/helpers/createGlossaryGroupedObject.js';


function Glossary() {
  const glossaryGroupedObject = createGlossaryGroupedObject(glossaryObject);
  // console.log(glossaryGroupedObject);
}


export default Glossary();
