import { h, Component } from 'preact';
import SearchResultMarkup from './SearchResultMarkup.jsx';


export default class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      province: {
        value: null,
        open: false,
      },
    };

    this.updateFilter = this.updateFilter.bind(this);
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

  updateItem(key, value, parent) {
    if (parent) {
      return this.setState({
        [parent]: {
          ...this.state[parent],
          [key]: value,
        },
      });
    }

    return this.setState({ [key]: value });
  }

  updateFilter(filter, value) {
    if (this.state[filter].open) {
      return this.setState({
        [filter]: {
          ...this.state[filter],
          value,
          open: false,
        },
      });
    }

    return this.updateItem('open', true, [filter]);
  }

  render() {
    return (
      <SearchResultMarkup state={this.state} search={this.props.search} selectedYear={this.props.selectedYear} updateFilter={this.updateFilter} />
    );
  }
}

