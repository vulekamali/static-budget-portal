import { h, render, Component } from 'preact';
import { parse } from 'query-string';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';
import Videos from './index.jsx';
import lunrSearchWrapper from './../../../utilities/js/helpers/lunrSearchWrapper.js';
import wrapStringPhrases from './../../../utilities/js/helpers/wrapStringPhrases.js';

class VideosContainer extends Component {
  constructor(props) {
    super(props);
    const { items } = this.props;

    this.state = {
      open: null,
      currentPhrase: '',
      currentItems: items,
    };

    this.setModal = this.setModal.bind(this);
    this.changePhrase = this.changePhrase.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }


  componentWillMount() {
    const { phrase } = this.props;

    if (phrase) {
      this.setState({
        currentPhrase: phrase,
        currentItems: this.filterItems(phrase),
      });
    }
  }


  setModal(state, id, language) {
    if (state) {
      this.setState({
        open: {
          id,
          language,
          select: false,
        },
      });
    } else {
      this.setState({ open: null });
    }
  }


  setLanguage(language) {
    if (this.state.open.select === true) {
      this.setState({
        open: {
          ...this.state.open,
          language,
          select: false,
        },
      });
    } else {
      this.setState({
        open: {
          ...this.state.open,
          select: true,
        },
      });
    }
  }


  changePhrase(phrase) {
    this.setState({
      currentPhrase: phrase,
      currentItems: this.filterItems(phrase),
    });
  }


  filterItems(phrase) {
    if (phrase.length < 3) {
      return this.props.items;
    }

    const filteredItems = lunrSearchWrapper(
      this.props.items,
      'id',
      ['title', 'description'],
      phrase,
    );

    const phraseArray = [phrase, ...phrase.split(' ')];
    const wrapFn = string => `<em class="Highlight">${string}</em>`;

    const currentItems = filteredItems.map((obj) => {
      return {
        ...obj,
        title: wrapStringPhrases(obj.title, phraseArray, wrapFn),
        description: wrapStringPhrases(obj.title, phraseArray, wrapFn),
      };
    });

    return currentItems;
  }

  render() {
    return (
      <Videos
        open={this.state.open}
        items={this.state.currentItems}
        currentPhrase={this.state.currentPhrase}

        changePhrase={this.changePhrase}
        setModal={this.setModal}
        setLanguage={this.setLanguage}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initVideos');
  const { phrase } = parse(location.search);

  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      const items = JSON.parse(decodeHtmlEntities(nodes[i].getAttribute('data-items'))).data;
      render(<VideosContainer {...{ items, phrase }} />, nodes[i]);
    }
  }
}


export default scripts();
