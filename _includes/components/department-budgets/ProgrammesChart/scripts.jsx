import renderToString from 'preact-render-to-string';
import canvg from 'canvg-browser';
import { h, render, Component } from 'preact';
import BarChart from './../../universal/BarChart/index.jsx';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js';
import ProgrammesChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';
import calcShareAction from './partials/calcShareAction.js';


class ProgrammesChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 200,
      mobile: true,
      selected: 'link',
      open: false,
      modal: false,
    };

    this.hasNull = Object.keys(this.props.items).reduce(
      (result, key) => {
        return !this.props.items[key] ? true : result;
      },
      false,
    );

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
    this.canvas = null;
    this.parentAction = this.parentAction.bind(this);
    this.changeAction = this.changeAction.bind(this);
    this.shareAction = this.shareAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.downloadAction = this.downloadAction.bind(this);
    this.canvasAction = this.canvasAction.bind(this);
  }


  shareAction() {
    calcShareAction(
      this.state.selected,
      'programmes-chart',
      () => this.setState({ modal: true }),
    );
  }

  closeModal() {
    this.setState({ modal: false });
  }


  parentAction(node) {
    this.node = node;
    this.updateWidth();
  }


  downloadAction() {
    canvg(this.canvas, renderToString(
      <BarChart
        scale={1.5}
        downloadable={{
          heading: this.props.dept,
          subHeading: `${this.props.deptLocation} Department Budget for ${this.props.year}`,
          type: 'Programme budgets',
        }}
        items={this.props.items}
        guides
        width={900}
      />,
    ));

    if (this.canvas.msToBlob) {
      const blob = this.canvas.msToBlob();
      return window.navigator.msSaveBlob(blob, 'chart.png', { scaleWidth: 10, scaleHeight: 10 });
    }

    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = this.canvas.toDataURL();
    return link.click();
  }


  canvasAction(node) {
    this.canvas = node;
  }


  changeAction(value) {
    if (this.state.open) {
      return this.setState({
        ...this.state,
        selected: value,
        open: false,
      });
    }

    return this.setState({ open: true });
  }


  render() {
    return (
      <ProgrammesChart
        items={this.props.items}
        width={this.state.width}
        parentAction={this.parentAction}
        mobile={this.state.mobile}
        hasNull={this.hasNull}
        year={this.props.year}
        files={this.props.files}

        open={this.state.open}
        selected={this.state.selected}
        changeAction={this.changeAction}
        shareAction={this.shareAction}
        closeModal={this.closeModal}
        modal={this.state.modal}

        downloadAction={this.downloadAction}
        canvasAction={this.canvasAction}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initProgrammesChart');

  const getJsonAttribute = (name, node) => {
    return JSON.parse(decodeHtmlEntities(node.getAttribute(name)));
  };

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    const rawValues = getJsonAttribute('data-values', node).data;
    const rawFiles = getJsonAttribute('data-files', node);
    const year = node.getAttribute('data-year', node);
    const dept = node.getAttribute('data-dept', node);
    const deptLocation = node.getAttribute('data-dept-location', node);


    const items = rawValues.reduce(
      (results, val) => {
        return {
          ...results,
          [val.name]: [val.total_budget],
        };
      },
      {},
    );

    const files = Object.keys(rawFiles).reduce(
      (results, key) => {
        const object = rawFiles[key].formats.reduce(
          (innerResults, val) => {
            return {
              ...innerResults,
              [`${key} (${val.format.replace(/^xls.+/i, 'Excel')})`]: val.url,
            };
          },
          {},
        );

        return {
          ...results,
          ...object,
        };
      },
      {},
    );

    render(
      <ProgrammesChartContainer {...{ items, year, files, dept, deptLocation }} />,
      node,
    );
  }
}


export default scripts();
