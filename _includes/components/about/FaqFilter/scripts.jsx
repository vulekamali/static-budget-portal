import { h, render, Component } from 'preact';
import FaqFilter from './index.jsx';
import getProp from './../../../utilities/js/helpers/getProp.js';
import createComponents from './../../../utilities/js/helpers/createComponents.js';
import lunrSearchWrapper from './../../../utilities/js/helpers/lunrSearchWrapper.js';
import wrapStringPhrases from './../../../utilities/js/helpers/wrapStringPhrases.js';


class FaqFilterContainer extends Component {
  constructor(props) {
    super(props);
    const { values } = this.props;

    this.state = {
      results: values,
      phrase: '',
    };

    this.events = {
      updatePhrase: this.updatePhrase.bind(this),
    };
  }

  updatePhrase(phrase) {
    this.setState({ phrase });
    this.updateResults(phrase);
  }

  updateResults(phrase) {
    const { values } = this.props;

    if (phrase.length > 2) {
      const filteredItems = lunrSearchWrapper(
        values,
        'title',
        ['title', 'text'],
        phrase.trim(),
      );

      const phraseArray = [phrase.trim(), ...phrase.trim().split(' ')];
      const wrapFn = string => `<em class="Highlight">${string}</em>`;

      const results = filteredItems.map((obj) => {
        return {
          ...obj,
          title: wrapStringPhrases(obj.title, phraseArray, wrapFn, { minChars: 3, excludeHtml: true }),
          text: wrapStringPhrases(obj.text, phraseArray, wrapFn, { minChars: 3, excludeHtml: true }),
        };
      });

      return this.setState({ results });
    }

    return this.setState({ results: values });
  }

  render() {
    const { results, phrase } = this.state;
    const { updatePhrase } = this.events;
    return <FaqFilter {...{ results, phrase, updatePhrase }} />;
  }
}


function scripts() {
  const createInstance = (node) => {
    const items = Array.prototype.slice.call(getProp('item', node, { parse: 'node', loop: true }));
    const values = items.map((innerNode) => {
      return {
        title: getProp('title', innerNode, { parse: 'node', nodeParse: 'innerHTML' }),
        text: getProp('text', innerNode, { parse: 'node', nodeParse: 'innerHTML' }),
      };
    });

    render(<FaqFilterContainer {...{ values }} />, node.parent, node);
  };

  createComponents('FaqFilter', createInstance, true);
}


export default scripts();
