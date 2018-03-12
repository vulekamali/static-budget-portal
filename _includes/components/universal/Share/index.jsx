import { h, Component } from 'preact';
import ShareMarkup from './ShareMarkup.jsx';


export default class ShareContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'copy',
      shareOpen: false,
      modal: false,
    };

    this.updateShare = this.updateShare.bind(this);
    this.updateModal = this.updateModal.bind(this);
  }

  updateModal(state) {
    this.setState({ modal: state });
  }

  updateShare(value) {
    if (this.state.shareOpen) {
      this.setState({ shareOpen: false });
      this.setState({ selected: value });
      return null;
    }

    return this.setState({ shareOpen: true });
  }

  render() {
    return <ShareMarkup {...this.state} updateShare={this.updateShare} updateModal={this.updateModal} />;
  }
}
