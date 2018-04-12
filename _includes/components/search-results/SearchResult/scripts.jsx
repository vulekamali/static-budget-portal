import { h, render, Component } from 'preact';
import SearchResult from './index.jsx';
import { apiBaseURL } from '../../../utilities/config/global.json';
import removePunctuation from '../../../utilities/js/helpers/removePunctuation.js';


class SearchResultContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      count: null,
      page: 1,
      province: 'all',
      open: null,
      error: false,
      loading: true,
    };

    this.updateItem = this.updateItem.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    const datasetPackagesQueryUrl = `${apiBaseURL}/api/3/action/package_search?q=${removePunctuation(this.props.search)}&start=0&rows=999&fq=+organization:national-treasury+vocab_financial_years:${this.props.selectedYear}+extras_department_name_slug:[* TO *]+extras_geographic_region_slug:[* TO *]`;

    const request = new Promise((resolve, reject) => {
      fetch(datasetPackagesQueryUrl)
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
      .then((array) => {
        this.setState({ loading: false });
        this.setState({ results: array });
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ error: true });
        console.warn(err);
      });
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
      this.setState({ page: 1 });
      this.setState({ [filter]: value });
      this.setState({ open: null });
      return null;
    }

    return this.setState({ open: filter });
  }

  render() {
    return (
      <SearchResult
        results={this.state.results}
        search={this.props.search}
        selectedYear={this.props.selectedYear}
        updateFilter={this.updateFilter}
        shown={this.state.shown}
        changeShown={this.changeShown}
        page={this.state.page}
        province={this.state.province} 
        state={this.state}
        updateItem={this.updateItem}
        error={this.state.error}
        loading={this.state.loading}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initSearchResult');
  const nodesArray = [...nodes];
  const { search } = window.vulekamali.qs;

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      const selectedYear = node.getAttribute('data-year');
      render(<SearchResultContainer {...{ selectedYear, search }} />, node);
    });
  }
}


export default scripts();
