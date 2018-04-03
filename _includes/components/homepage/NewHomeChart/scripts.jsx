import { h, render, Component } from 'preact';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js';
import getProp from './../../../utilities/js/helpers/getProp.js';
import arrayToObject from './../../../utilities/js/helpers/arrayToObject.js';
import HomeChart from './index.jsx';
import arrayHasValue from './../../../utilities/js/helpers/arrayHasValue.js';


class HomeChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 200,
      mobile: true,
    };

    this.updateWidth = () => {
      if (this.state.mobile && window.innerWidth >= 600) {
        this.setState({ mobile: false });
      } else if (!this.state.mobile && window.innerWidth < 600) {
        this.setState({ mobile: true });
      }

      if (this.node && this.node.offsetWidth !== this.state.width) {
        if (this.node.offsetWidth <= 200 && this.state.width !== 200) {
          return this.setState({ width: 200 });
        }

        return this.setState({ width: parseInt(this.node.offsetWidth, 10) });
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
    return (
      <HomeChart
        items={this.props.items}
        width={this.state.width}
        parentAction={this.parentAction}
        mobile={this.state.mobile}
        hasNull={this.props.hasNull}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initNewHomeChart');

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const rawValues = getProp('values', node, true);
    const type = getProp('type', node);

    const hasNull = type === 'revenue' ?
      false :
      arrayHasValue(rawValues.data, null, 'total_budget');

    const items = type === 'revenue' ?
      arrayToObject(rawValues.data, 'category', val => [val]) :
      !hasNull ?
        arrayToObject(rawValues.data, 'name', val => [val]) :
        arrayToObject(
          rawValues.data,
          'name',
          (value, key) => {
            return {
              value,
              link: `/search-result?search_type=full-search&search=${key}`,
            };
          },
        );


    render(
      <HomeChartContainer {...{ items, hasNull }} />,
      node,
    );
  }
}


export default scripts();
