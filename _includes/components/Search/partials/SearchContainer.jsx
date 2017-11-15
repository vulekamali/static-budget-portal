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


  sendRequest(url) {
    const request = new Promise((resolve, reject) => {
      fetch(url)
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


  initRequest(value, url) {
    this.setState({ loading: true });
    this.setState({ keywords: value });

    if (this.state.keywords.length > 3) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId);
      }

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

