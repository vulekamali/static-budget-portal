import { h, Component } from 'preact';
import ShareMarkup from './partials/ShareMarkup.jsx';

export default class ShareContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'link',
    };

    this.events = {
      updateShare: this.updateShare.bind(this),
    };
  }

  updateShare(selected) {
    return this.setState({ selected });
  }

  render() {
    const { anchor } = this.props;
    const { selected } = this.state;
    const { updateShare } = this.events;
    return <ShareMarkup {...{ selected, anchor, updateShare }} />;
  }
}
