import { h, Component } from 'preact';
import { parse } from 'query-string';
import getLandingResults from './getLandingResults.js';
import getFacetResults from './getFacetResults.js';
import SearchPage from './SearchPage.jsx';


export default class SearchPageContainer extends Component {
  constructor(props) {
    super(props);

    const { tab } = parse(location.search);

    this.state = {
      tab: tab || 'all',
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
    const { phrase } = this.props;
    const callbackWrap = () => getLandingResults(phrase);
    this.getNewResults(phrase, 'all', callbackWrap);
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
    const { loadingPage } = this.state;
    const { tab, page } = this.state;
    const { phrase } = this.props;

    if (!loadingPage) {
      this.setState({
        loadingPage: true,
      });

      if (this.static.currentFetch && this.static.currentFetch.token.active) {
        this.static.currentFetch.token.cancel();
      }

      this.static.currentFetch = getFacetResults(phrase, tab, (page - 1) * 5);

      this.static.currentFetch.request
        .then((data) => {
          this.setState({
            loadingPage: false,
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
  }


  updateTab(newTab) {
    const { phrase } = this.props;
    const { tab } = this.state;

    this.setState({
      tab: newTab,
      loading: true,
      page: 1,
      items: null,
    });

    if (newTab !== tab) {
      if (newTab === 'all') {
        const callbackWrap = () => getLandingResults(phrase);
        this.getNewResults(phrase, newTab, callbackWrap);
      } else {
        const callbackWrap = () => getFacetResults(phrase, newTab, 0);
        this.getNewResults(phrase, newTab, callbackWrap);
      }
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
