import { h, Component } from 'preact';
import SearchResultMarkup from './SearchResultMarkup.jsx';


export default class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };

    this.eventHandlers = {
      updateFilter: this.updateFilter.bind(this),
      filterResults: this.filterResults.bind(this),
    };
  }

  componentDidMount() {
    const url = `https://treasurydata.openup.org.za/api/3/action/package_search?q=${this.props.search}&fq=vocab_financial_years:${this.props.selectedYear}`;

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

    request
      .then(array => this.setState({ results: array }))
      .catch(err => new Error(err));
  }

  render() {
    return (
      <SearchResultMarkup {...this.state} />
    );
  }
}

