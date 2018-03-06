import { h, Component } from 'preact';
import YearSelectMarkup from './YearSelectMarkup.jsx';


export default class YearSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      open: false,
      tooltip: null,
    };

    this.updateItem = this.updateItem.bind(this);
    this.data = this.normaliseData();
  }

  normaliseData() {
    return this.props.jsonData.reduce(
      (result, val) => {
        return [
          ...result,
          {
            direct: val.closest_match.is_exact_match,
            url: val.closest_match.url_path,
            name: val.id,
            active: val.is_selected,
          },
        ];
      },
      [],
    );
  }

  updateItem(key, value) {
    return this.setState({ [key]: value });
  }

  render() {
    return (
      <YearSelectMarkup
        jsonData={this.data}
        search={this.props.search}
        loading={this.state.loading}
        open={this.state.open}
        updateItem={this.updateItem}
        tooltip={this.state.tooltip}
      />
    );
  }
}
