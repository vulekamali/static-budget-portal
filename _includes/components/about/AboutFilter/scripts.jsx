import { h, render, Component } from 'preact';
import { zipWith } from 'lodash';
import getProp from './../../../utilities/js/helpers/getProp.js';
import createComponents from './../../../utilities/js/helpers/createComponents.js';
import lunrSearchWrapper from './../../../utilities/js/helpers/lunrSearchWrapper.js';
import wrapStringPhrases from './../../../utilities/js/helpers/wrapStringPhrases.js';
import AboutFilter from './index.jsx';


class AboutFilterContainer extends Component {
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
  }

  updateResults(phrase) {
    const { values } = this.props;

    if (phrase.length > 2) {
      


      // const filteredItems = lunrSearchWrapper(
      //   values,
      //   'title',
      //   ['title', 'text'],
      //   phrase,
      // );

      // const phraseArray = [phrase, ...phrase.split(' ')];
      // const wrapFn = string => `<em class="Highlight">${string}</em>`;

      // const results = filteredItems.map((obj) => {
      //   return {
      //     ...obj,
      //     title: wrapStringPhrases(obj.title, phraseArray, wrapFn),
      //     text: wrapStringPhrases(obj.text, phraseArray, wrapFn),
      //   };
      // });

      // return this.setState({ results });
    }

    // return this.setState({ results: values });
  }

  render() {
    const { results, phrase } = this.state;
    const { updatePhrase } = this.events;
    return <AboutFilter {...{ results, phrase, updatePhrase }} />;
  }
}


function scripts() {
  const createInstance = (node) => {
    const titles = getProp('title', node, { parse: 'node', loop: true, nodeParse: 'innerHTML' });
    console.log(titles);

    const itemsNodes = Array.prototype.slice.call(getProp('item', node, { parse: 'node', loop: true }));
    const cards = itemsNodes.map((innerNode) => {
      const titleList = getProp('card-title', innerNode, { parse: 'node', loop: true, nodeParse: 'innerHTML' });
      const textList = getProp('card-text', innerNode, { parse: 'node', loop: true, nodeParse: 'innerHTML' });

      const createObj = (title, text) => ({ title, text });
      return zipWith(titleList, textList, createObj);
    });

    const createObj = (title, cardsArray) => ({ title, cardsArray });
    const values = zipWith(titles, cards, createObj);
    // render(<AboutFilterContainer {...{ values }} />, node.parent, node);
  };

  createComponents('AboutFilter', createInstance, true);
}


export default scripts();

