import { h, Component } from 'preact';
import ShareMarkup from './partials/ShareMarkup.jsx';
import store from './../../../store.js';


export default class ShareContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'link',
    };

    const createModal = () => {
      const { anchor } = this.props;
      const anchorUri = anchor ? `#${anchor}` : '';

      return store.dispatch({
        type: 'CREATE_MODAL',
        title: 'Share this link:',
        markup: (
          <a className="u-wordBreak u-wordBreak--breakAll" href={window.location.href + anchorUri}>
            {window.location.href + anchorUri}
          </a>
        ),
      });
    };

    this.events = {
      updateShare: this.updateShare.bind(this),
      createModal,
    };
  }

  updateShare(selected) {
    return this.setState({ selected });
  }

  render() {
    const { selected } = this.state;
    const { updateShare, createModal } = this.events;
    return <ShareMarkup {...{ selected, updateShare, createModal }} />;
  }
}