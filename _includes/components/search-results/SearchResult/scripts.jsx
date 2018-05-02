import { h, render, Component } from 'preact';
import { pick, find } from 'lodash';
import SearchResult from './index.jsx';
import { apiBaseURL } from '../../../utilities/config/global.json';
import removePunctuation from '../../../utilities/js/helpers/removePunctuation.js';
import fetchWrapper from './../../../utilities/js/helpers/fetchWrapper.js';


class SearchResultContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      count: null,
      page: 1,
      error: false,
      otherYears: null,
    };

    this.events = {
      updateItem: this.updateItem.bind(this),
    };
  }

  componentDidMount() {
    const datasetPackagesQueryUrl = `${apiBaseURL}/api/3/action/package_search?q=${removePunctuation(this.props.search)}&start=0&rows=999&fq=+organization:national-treasury+vocab_financial_years:${this.props.selectedYear}+extras_department_name_slug:[* TO *]+extras_geographic_region_slug:[* TO *]`;

    fetchWrapper(datasetPackagesQueryUrl)
      .then((data) => {
        this.setState({
          results: data.result.results,
          count: data.result.count,
        });
      })
      .catch((err) => {
        console.warn(err);
        this.setState({
          error: true,
        });
      });

    const otherYearsQuery = `https://data.vulekamali.gov.za/api/3/action/package_search?q=${removePunctuation(this.props.search)}&start=0&rows=0&fq=+organization:national-treasury+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]&facet.field=[%22vocab_financial_years%22]`;
    fetchWrapper(otherYearsQuery)
      .then((data) => {
        const rawResult = data.result.search_facets.vocab_financial_years.items;
        const totalYears = rawResult.map(obj => pick(obj, ['count', 'name']));
        const otherYears = totalYears.filter(obj => obj.name !== this.props.selectedYear);
        const currentYear = find(totalYears, obj => obj.name === this.props.selectedYear);
        const total = parseInt(currentYear.count, 10);

        this.setState({
          count: {
            shown: total > 10 ? 10 : total,
            total,
          },
          otherYears,
        });
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

  render() {
    const { results, page, error, otherYears, count } = this.state;
    const { search, selectedYear } = this.props;
    const { updateItem } = this.events;

    return (
      <SearchResult
        {...{
          results,
          page,
          error,
          otherYears,
          count,

          search,
          selectedYear,

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
