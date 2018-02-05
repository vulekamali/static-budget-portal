import { h, Component } from 'preact';
import DeptSearchMarkup from './DeptSearchMarkup.jsx';
import filterResults from './filterResults.js';


export default class DeptSearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: null,

      filters: {
        keywords: '',
        sphere: this.props.sphere || 'all',
        province: 'all',
      },

      results: this.props.jsonData,
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
    return <DeptSearchMarkup state={this.state} eventHandlers={this.eventHandlers} />;
  }
}
