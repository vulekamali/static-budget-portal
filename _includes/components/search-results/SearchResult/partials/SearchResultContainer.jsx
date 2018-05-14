import { h, Component } from 'preact';
import getLandingResults from './getLandingResults.js';
import getFacetResults from './getFacetResults.js';
import SearchPage from './SearchPage.jsx';


export default class SearchPageContainer extends Component {
  constructor(props) {
    super(props);
    const { view } = this.props;

    this.state = {
      tab: view || 'all',
      items: null,
      loading: true,
      error: false,
      loadingPage: false,
      page: 1,
    };

    this.static = {
      currentFetch: null,
    };

    this.events = {
      updateTab: this.updateTab.bind(this),
      addPage: this.addPage.bind(this),
    };
  }

  componentWillMount() {
    const { phrase, view = 'all', year } = this.props;

    this.setState({
      loading: true,
      tab: view,
    });

    if (view === 'all') {
      const callbackWrap = () => getLandingResults(phrase, year);
      return this.getNewResults(phrase, view, callbackWrap);
    }

    const callbackWrap = () => getFacetResults(phrase, view, 0, year);
    return this.getNewResults(phrase, view, callbackWrap);
  }


  getNewResults(phrase, newTab, callback) {
    if (this.static.currentFetch && this.static.currentFetch.token.active) {
      this.static.currentFetch.token.cancel();
    }

    this.static.currentFetch = callback();

    this.static.currentFetch.request
      .then(items => this.setState({
        items,
        loading: false,
      }))
      .catch((err) => {
        this.setState({
          error: true,
          loading: false,
        });
        console.warn(err);
      });
  }


  addPage() {
    const { tab, page } = this.state;
    const { phrase, year } = this.props;

    if (this.static.currentFetch && this.static.currentFetch.token.active) {
      this.static.currentFetch.token.cancel();
    }

    this.static.currentFetch = getFacetResults(phrase, tab, page * 5, year);

    this.static.currentFetch.request
      .then((data) => {
        this.setState({
          page: page + 1,
          items: {
            count: this.state.items.count,
            items: [
              ...this.state.items.items,
              ...data.items,
            ],
          },
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
          loading: false,
        });
        console.warn(err);
      });
  }


  updateTab(newTab, scroll) {
    const { phrase, year, rootNode } = this.props;
    const { tab } = this.state;

    this.setState({
      tab: newTab,
      loading: true,
      page: 1,
      items: null,
    });

    if (scroll) {
      rootNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    history.replaceState({}, '', `/${year}/search-result?search=${encodeURI(phrase)}&view=${newTab}`);

    if (newTab === 'all') {
      const callbackWrap = () => getLandingResults(phrase, year);
      this.getNewResults(phrase, newTab, callbackWrap);
    } else {
      const callbackWrap = () => getFacetResults(phrase, newTab, 0, year);
      this.getNewResults(phrase, newTab, callbackWrap);
    }
  }


  render() {
    const { phrase, year } = this.props;
    const { tab, items, loading, loadingPage, page, error } = this.state;
    const { updateTab, addPage } = this.events;

    return (
      <SearchPage
        {...{
          phrase,
          page,
          items,
          tab,
          year,
          updateTab,
          loading,
          addPage,
          loadingPage,
          error,
        }}
      />
    );
  }
}
