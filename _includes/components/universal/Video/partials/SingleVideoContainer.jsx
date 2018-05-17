import { h, Component } from 'preact';
import { PropTypes } from 'prop-types';
import Embed from './Embed.jsx';
import ModalWrap from './ModalWrap.jsx';


export default class SingleVideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: null,
    };

    this.events = {
      setActiveKey: this.setActiveKey.bind(this),
    };
  }

  setActiveKey(activeKey) {
    this.setActiveId({ activeKey });
  }

  render() {
    const { setActiveKey } = this.events;
    const { activeKey } = this.state;
    const { modal, title, description, languages } = this.props;

    if (modal) {
      return <Embed {...{ setActiveKey, activeKey, title, description, languages }} />;
    }

    return (
      <ModalWrap
        activeKey={Object.keys(languages)[0]}
        {...{ setActiveKey, title, description, languages }}
      />
    );
  }
}


SingleVideoContainer.propTypes = {
  modal: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  languages: PropTypes.objectOf(PropTypes.string).isRequired,
};

SingleVideoContainer.defaultProps = {
  modal: false,
};

