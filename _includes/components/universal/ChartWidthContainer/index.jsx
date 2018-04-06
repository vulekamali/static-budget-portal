import PropTypes from 'prop-types';
import { h, Component } from 'preact';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js';


class ChartWidthContainer extends Component {
  constructor(props) {
    super(props);

    const { minWidth, breakpoint } = this.props;

    this.state = {
      width: minWidth,
      mobile: true,
    };

    this.updateWidth = () => {
      if (this.state.mobile && window.innerWidth >= breakpoint) {
        this.setState({ mobile: false });
      } else if (!this.state.mobile && window.innerWidth < breakpoint) {
        this.setState({ mobile: true });
      }

      if (this.node && this.node.offsetWidth !== this.state.width) {
        if (this.node.offsetWidth <= 200 && this.state.width !== 200) {
          return this.setState({ width: 200 });
        }

        return this.setState({ width: this.node.offsetWidth });
      }

      return null;
    };

    const viewportDebounce = new DebounceFunction(300);
    const updateViewport = () => viewportDebounce.update(this.updateWidth);

    window.addEventListener(
      'resize',
      updateViewport,
    );

    this.node = null;
    this.parentAction = this.parentAction.bind(this);
  }

  parentAction(node) {
    this.node = node;
    this.updateWidth();
  }

  render() {
    const { component, items } = this.props;
    const { mobile, width } = this.state;

    return component({
      parentAction: this.parentAction,
      guides: !mobile,
      hover: !mobile,
      width,
      items,
    });
  }
}


ChartWidthContainer.propTypes = {
  component: PropTypes.element.isRequired,
  minWidth: PropTypes.number, 
  breakpoint: PropTypes.number,
  items: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

ChartWidthContainer.defaultProps = {
  minWidth: 200,
  breakpoint: 600,
};
