import { h, Component } from 'preact';
import Fuse from 'fuse.js';
import Markup from './Markup.jsx';


export default class Container extends Component {
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
        threshold: 0.3,
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
    return <Markup {...this.state} {...this.eventHandlers} />;
  }
}
