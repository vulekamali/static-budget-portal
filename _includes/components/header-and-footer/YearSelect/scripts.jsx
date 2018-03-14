import { h, Component, render } from 'preact';
import YearSelect from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


class YearSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      open: false,
      tooltip: null,
    };

    this.updateItem = this.updateItem.bind(this);
    this.data = this.normaliseData();
  }

  normaliseData() {
    return this.props.jsonData.reduce(
      (result, val) => {
        return [
          ...result,
          {
            direct: val.closest_match.is_exact_match,
            url: val.closest_match.url_path,
            name: val.id,
            active: val.is_selected,
          },
        ];
      },
      [],
    );
  }

  updateItem(key, value) {
    return this.setState({ [key]: value });
  }

  render() {
    return (
      <YearSelect
        jsonData={this.data}
        search={this.props.search}
        loading={this.state.loading}
        open={this.state.open}
        updateItem={this.updateItem}
        tooltip={this.state.tooltip}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initYearSelect');
  const nodesArray = [...nodes];
  const { search, no_js: noJs } = window.budgetPortal.stringQueries;

  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach((node, i) => {
      const jsonData = JSON.parse(decodeHtmlEntities(nodes[i].getAttribute('data-json'))).data;

      render(
        <YearSelectContainer {...{ jsonData, search }} />,
        nodes[i].parentNode,
        nodes[i],
      );
    });
  }
}


export default scripts();
