import { h, Component } from 'preact';
import Markup from './Markup.jsx';


export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPhrase: '',
      itemsObject: this.props,
    };

    this.updateItem = this.updateItem.bind(this);
  }


  updateItem(key, value) {
    return this.setState({ [key]: value });
  }


  render() {
    return <Markup currentPhrase={this.state.currentPhrase} updateItem={this.updateItem} />;
  }
}
