import Fuse from 'fuse.js';
import { h, render, Component } from 'preact';
import Glossary from './index.jsx';
import glossaryObject from './../../../../_data/glossary.json';
import createGlossaryGroupedObject from './../../../utilities/js/helpers/createGlossaryGroupedObject.js';


class GlossaryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPhrase: '',
      currentItems: this.props.glossaryObject,
    };

    this.eventHandlers = {
      changePhrase: this.changePhrase.bind(this),
    };
  }


  changePhrase(phrase) {
    this.setState({ currentPhrase: phrase });

    if (phrase.length > 2) {
      const options = {
        shouldSort: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'phrase',
        ],
      };

      const letters = Object.keys(this.props.glossaryObject);

      const filteredList = letters.reduce(
        (result, letter) => {
          const array = this.props.glossaryObject[letter];
          const items = new Fuse(array, options);

          return {
            ...result,
            [letter]: items.search(phrase),
          };
        },
        {},
      );

      return this.setState({ currentItems: filteredList });
    }

    return this.setState({ currentItems: this.props.glossaryObject });
  }


  render() {
    return <Glossary {...this.state} {...this.eventHandlers} />;
  }
}


function scripts() {
  const glossaryGroupedObject = createGlossaryGroupedObject(glossaryObject);
  const nodes = document.getElementsByClassName('js-initGlossary');

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      render(<GlossaryContainer glossaryObject={glossaryGroupedObject} />, nodes[i]);
    }
  }
}


export default scripts();
