import { h, Component } from 'preact';
import SearchResultMarkup from './SearchResultMarkup.jsx';


export default class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      count: null,
      shown: 5,
      province: 'all',
      open: null,
    };

    this.updateFilter = this.updateFilter.bind(this);
    this.changeShown = this.changeShown.bind(this);
  }

  componentDidMount() {
    const url = `https://treasurydata.openup.org.za/api/3/action/package_search?q=${this.props.search}&start=0&rows=${this.state.shown}&fq=vocab_financial_years:${this.props.selectedYear}`;

    const request = new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            reject(response);
          }

          response.json()
            .then((data) => {
              this.setState({ count: data.result.count });
              resolve(data.result.results);
            })
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
    if (this.state.open === filter) {
      this.setState({ [filter]: value });
      this.setState({ open: null });
      return null;
    }

    return this.setState({ open: filter });
  }

  changeShown(value) {
    const realValue = value > this.state.count ? this.state.count : value;
    this.setState({ shown: realValue });

    const url = `https://treasurydata.openup.org.za/api/3/action/package_search?q=${this.props.search}&start=0&rows=${this.state.shown}&fq=vocab_financial_years:${this.props.selectedYear}`;

    const request = new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            reject(response);
          }

          response.json()
            .then((data) => {
              this.setState({ count: data.result.count });
              resolve(data.result.results);
            })
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
      <SearchResultMarkup state={this.state} count={this.state.count} search={this.props.search} selectedYear={this.props.selectedYear} updateFilter={this.updateFilter} shown={this.state.shown} changeShown={this.changeShown} />
    );
  }
}

