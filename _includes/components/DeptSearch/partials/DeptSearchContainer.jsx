import { h, Component } from 'preact';
import Fuse from 'fuse.js';
import DeptSearchMarkup from './DeptSearchMarkup.jsx';


export default class DeptSearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: '',
      province: null,
      spheres: this.props.spheres || null,
      open: null,
      results: this.props.jsonData,
    };

    this.eventHandlers = {
      updateFilter: this.updateFilter.bind(this),
      filterResults: this.filterResults.bind(this),
    };
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
      this.setState({ open: null });
    } else {
      this.setState({ open: filter });
    }

    return this.setState({ [filter]: value });
  }


  filterResults(keywords) {
    this.updateItem('keywords', keywords);

    if (keywords.length > 2) {
      const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'name',
        ],
      };

      const jsonData = this.props.jsonData;
      const results = jsonData.map((group) => {
        const items = new Fuse(group.departments, options);
        return {
          ...group,
          departments: items.search(keywords),
        };
      });

      return this.setState({ results });
    }

    return this.setState({ results: this.props.jsonData });
  }


  render() {
    return <DeptSearchMarkup state={this.state} eventHandlers={this.eventHandlers} />;
  }
}
