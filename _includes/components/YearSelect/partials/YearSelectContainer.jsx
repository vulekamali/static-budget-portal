import { h, Component } from 'preact';
import YearSelectMarkup from './YearSelectMarkup.jsx';


export default class YearSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(key, value) {
    return this.setState({ [key]: value });
  }

  render() {
    return (
      <YearSelectMarkup
        jsonData={this.props.jsonData}
        search={this.props.search}
        open={this.state.open}
        updateItem={this.updateItem}
      />
    );
  }
}
