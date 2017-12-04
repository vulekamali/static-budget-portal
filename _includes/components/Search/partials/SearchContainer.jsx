import { h, Component } from 'preact';
import SearchMarkup from './SearchMarkup.jsx';
import analyticsEvents from './../../../utilities/js/helpers/analyticsEvent.js';


export default class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: this.props.search || '',
      results: [],
      focus: null,
      fullLoading: false,
      loading: null,
      timeoutId: null,
      focusTimeout: null,
      count: null,
      error: false,
    };

    this.eventHandlers = {
      updateItem: this.updateItem.bind(this),
      initRequest: this.initRequest.bind(this),
      setFocus: this.setFocus.bind(this),
    };
  }

  componentDidMount() {
    if (this.props.search) {
      this.initRequest(this.state.keywords);
    }
  }

  setFocus(state) {
    if (state === false && this.state.focusTimeout === null) {
      const focusTimeout = setTimeout(
        () => {
          this.updateItem('focus', false);
          this.updateItem('focusTimeout', null);
        },
        500,
      );

      this.setState({ focusTimeout });
    }

    if (state === true) {
      if (this.state.focusTimeout !== null) {
        clearInterval(this.state.focusTimeout);
      }
      return this.updateItem('focus', true);
    }

    return null;
  }

  updateItem(key, value) {
    return this.setState({ [key]: value });
  }

  sendRequest(keyword) {
    const request = new Promise((resolve, reject) => {
      fetch(keyword)
        .then((response) => {
          if (!response.ok) {
            response.text()
              .then((data) => {
                analyticsEvents(
                  'send',
                  'event',
                  'search-error',
                  'error-response',
                  JSON.stringify({ url: response.url, body: data.slice(0, 500) }),
                );
              });

            reject(response);
          }

          response.json()
            .then((data) => {
              if (!data.success) {
                analyticsEvents(
                  'send',
                  'event',
                  'search-error',
                  'ckan-200-error',
                  JSON.stringify({ url: response.url, error: data.error }),
                );
              }

              this.setState({ count: data.result.count });
              resolve(data.result.results);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });

    return request
      .then((array) => {
        this.setState({ timeoutId: null });
        this.setState({ results: array });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ error: true });
        console.warn(err);
      });
  }


  initRequest(keywords) {
    this.setState({ count: null });
    this.setState({ loading: true });
    this.setState({ keywords });

    if (this.state.keywords.length >= 2) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId);
      }

      const url = `https://treasurydata.openup.org.za/api/3/action/package_search?q=${keywords}&start=0&rows=10&fq=vocab_financial_years:${this.props.selectedYear}`;
      const request = () => this.sendRequest(url);
      const newTimeoutId = setTimeout(request, 1000);
      this.setState({ timeoutId: newTimeoutId });
    }
  }


  render() {
    return (
      <SearchMarkup
        state={this.state}
        eventHandlers={this.eventHandlers}
        selectedYear={this.props.selectedYear}
        error={this.state.error}
        initRequest={this.initRequest}
        search={this.props.search}
        fullLoading={this.state.fullLoading}
      />
    );
  }
}

