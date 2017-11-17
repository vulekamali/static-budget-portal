import { h, Component } from 'preact';
import SearchMarkup from './SearchMarkup.jsx';


export default class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: '',
      results: [],
      focus: null,
      loading: true,
      timeoutId: null,
    };

    this.eventHandlers = {
      updateItem: this.updateItem.bind(this),
      initRequest: this.initRequest.bind(this),
    };
  }


  updateItem(key, value) {
    return this.setState({ [key]: value });
  }


  sendRequest(keyword) {
    const request = new Promise((resolve, reject) => {
      fetch(`${keyword}`)
        .then((response) => {
          if (!response.ok) {
            reject(response);
          }

          response.json()
            .then(data => resolve(data.result.results))
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
        return new Error(err);
      });
  }


  initRequest(keywords) {
    this.setState({ loading: true });
    this.setState({ keywords });

    if (this.state.keywords.length > 3) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId);
      }

      const url = `https://treasurydata.openup.org.za/api/3/action/package_search?q=${keywords}&fq=vocab_financial_years:${this.props.selectedYear}`;
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
      />
    );
  }
}

