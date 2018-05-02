import { h, render, Component } from 'preact';
import { pick } from 'lodash';
import SearchResult from './index.jsx';
import { apiBaseURL } from '../../../utilities/config/global.json';
import removePunctuation from '../../../utilities/js/helpers/removePunctuation.js';
import fetchWrapper from './../../../utilities/js/helpers/fetchWrapper.js';


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
      otherYears: null,
    };

    this.events = {
      updateItem: this.updateItem.bind(this),
      updateFilter: this.updateFilter.bind(this),
    };
  }

  componentDidMount() {
    const datasetPackagesQueryUrl = `${apiBaseURL}/api/3/action/package_search?q=${removePunctuation(this.props.search)}&start=0&rows=999&fq=+organization:national-treasury+vocab_financial_years:${this.props.selectedYear}+extras_department_name_slug:[* TO *]+extras_geographic_region_slug:[* TO *]`;

    fetchWrapper(datasetPackagesQueryUrl)
      .then((data) => {
        this.setState({
          loading: false,
          results: data.result.count,
          count: data.result.count,
        });
      })
      .catch((err) => {
        console.warn(err);
        this.setState({
          loading: false,
          error: true,
        });
      });

    const otherYearsQuery = `https://data.vulekamali.gov.za/api/3/action/package_search?q=${removePunctuation(this.props.search)}&start=0&rows=0&fq=+organization:national-treasury+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]&facet.field=[%22vocab_financial_years%22]`;
    fetchWrapper(otherYearsQuery)
      .then((data) => {
        const rawResult = data.result.search_facets.vocab_financial_years.items;
        const otherYears = rawResult.map(obj => pick(obj, ['count', 'name']));
        this.setState({ otherYears });
      })
      .catch(console.warn);
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
    const { results, shown, page, province, error, loading, otherYears } = this.state;
    const { search, selectedYear } = this.props;
    const { updateFilter, changeShown, updateItem } = this.events;

    return (
      <SearchResult
        {...{
          results,
          shown,
          page,
          province,
          error,
          loading,
          otherYears,

          search,
          selectedYear,

          updateFilter,
          changeShown,
          updateItem,
        }}
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
