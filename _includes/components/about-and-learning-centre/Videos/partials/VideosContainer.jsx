import { h, Component } from 'preact';
import Fuse from 'fuse.js';
import Markup from './Markup.jsx';


export default class VideosContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: null,
      currentPhrase: '',
      currentItems: this.props.items,
    };

    this.setModal = this.setModal.bind(this);
    this.changePhrase = this.changePhrase.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
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
          'title',
        ],
      };

      const items = new Fuse(this.props.items, options);
      const result = items.search(phrase);
      this.setState({ currentItems: result });
    } else {
      this.setState({ currentItems: this.props.items });
    }
  }


  render() {
    return (
      <Markup
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