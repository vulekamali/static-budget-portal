import { h, Component } from 'preact';
import YearSelectMarkup from './YearSelectMarkup.jsx';


export default class YearSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.updateItem = this.updateItem.bind(this);
    this.data = this.normaliseData();
  }

  normaliseData() {
    if (!this.props.jsonDynamic) {
      return this.props.jsonData.reduce(
        (result, val) => {
          return [
            ...result,
            {
              direct: true,
              url: val[1],
              name: val[0],
              active: val[2] === 'active',
            },
          ];
        },
        [],
      );
    }

    return this.props.jsonDynamic.reduce(
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
        open={this.state.open}
        updateItem={this.updateItem}
      />
    );
  }
}
