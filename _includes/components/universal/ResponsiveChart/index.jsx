import { h, Component } from 'preact';
import Markup from './partials/Markup.jsx';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js';


export default class ResponsiveChart extends Component {
  constructor(props) {
    super(props);

    const {
      minWidth = 250, 
      breakpoint = 600,
    } = this.props;

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
        if (this.node.offsetWidth <= minWidth && this.state.width !== minWidth) {
          return this.setState({ width: minWidth });
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
    const { type, items, download } = this.props;
    const { mobile, width } = this.state;

    return (
      <Markup
        parentAction={this.parentAction}
        guides={!mobile}
        hover={!mobile}
        {...{ type, items, width }}
      />
    );
  }
}
