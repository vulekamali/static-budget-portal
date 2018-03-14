import { h, Component, render } from 'preact';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';
import DeptSearch from './index.jsx';
import filterResults from './partials/filterResults.js';


class DeptSearchContainer extends Component {
  constructor(props) {
    super(props);
    const filters = {
      keywords: '',
      sphere: this.props.sphere || 'all',
      province: 'all',
    };

    const getEmptyGroups = (data) => {
      return data.reduce(
        (results, val) => {
          if (val.departments.length <= 0) {

            return [
              ...results,
              val.slug,
            ];
          }

          return results;
        },
        [],
      );
    };

    this.state = {
      loading: false,
      open: null,
      results: filterResults(filters, this.props.jsonData),
      emptyGroups: getEmptyGroups(this.props.jsonData),
      filters,
    };

    this.eventHandlers = {
      updateDropdown: this.updateDropdown.bind(this),
      updateKeywords: this.updateKeywords.bind(this),
    };
  }


  updateDropdown(filter, value) {
    if (this.state.open === filter) {
      this.setState({ open: null });
    } else {
      return this.setState({ open: filter });
    }

    const filters = {
      ...this.state.filters,
      province: 'all',
      [filter]: value,
    };

    this.setState({ filters });
    return this.setState({ results: filterResults(filters, this.props.jsonData) });
  }

  updateKeywords(keywords) {
    const filters = {
      ...this.state.filters,
      keywords,
    };

    this.setState({ filters });
    this.setState({ results: filterResults(filters, this.props.jsonData) });
  }


  render() {
    return <DeptSearch state={this.state} eventHandlers={this.eventHandlers} />;
  }
}


function scripts() {
  const componentsList = document.getElementsByClassName('js-initDeptSearch');

  if (componentsList.length > 0) {
    for (let i = 0; i < componentsList.length; i++) {
      const component = componentsList[i];
      const { sphere, no_js: noJs } = window.budgetPortal.stringQueries;

      const nationalData = JSON.parse(decodeHtmlEntities(component.getAttribute('data-national-json'))).data;
      const rawProvincialData = JSON.parse(decodeHtmlEntities(component.getAttribute('data-provincial-json'))).data;

      const provincialData = rawProvincialData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      const jsonData = [
        {
          ...nationalData,
          name: 'National',
        },
        ...provincialData,
      ];

      if (!noJs) {
        render(
          <DeptSearchContainer {...{ jsonData, sphere }} />,
          component.parentNode,
          component,
        );
      }
    }
  }
}


export default scripts();
