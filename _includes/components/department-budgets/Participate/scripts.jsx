import { h, Component, render } from 'preact';
import Participate from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


class ParticipateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.currentMonth,
    };
    this.setMonth = this.setMonth.bind(this);
  }

  setMonth(selected) {
    this.setState({ selected });
  }

  render() {
    return (
      <Participate
        selected={this.state.selected}
        items={this.props.items}
        setMonth={this.setMonth}
      />
    );
  }
}


const nodes = document.getElementsByClassName('js-initParticipate');

for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i];

  const currentMonthIndex = new Date().getMonth();
  const items = JSON.parse(decodeHtmlEntities(node.getAttribute('data-items')));
  const currentMonth = Object.keys(items)[currentMonthIndex];

  console.log(items, currentMonth);

  render(
    <ParticipateContainer {...{ items, currentMonth }} />,
    node,
  );
}
