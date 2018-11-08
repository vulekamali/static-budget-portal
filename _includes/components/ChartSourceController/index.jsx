import { h, Component } from 'preact';
import uuid from 'uuid/v4';
import BarChart from './components/BarChart/index.jsx';


const buildToggle = ({ toggle, changeSource, source }) => {
  const id = uuid();

  const toggleItems = Object.keys(toggle).map((key) => {
    const { title } = toggle[key];

    return (
      <label htmlFor={key} {...{ key }} className="ChartSourceController-item">
        <input
          type="radio"
          value={key}
          id={key}
          name={id}
          checked={key === source}
          onChange={event => changeSource(event.target.value)}
        />
        <span className="ChartSourceController-text">{title}</span>
      </label>
    );
  });

  const { description } = toggle[source];

  return (
    <div>
      <div className="ChartSourceController-options">
        {toggleItems}
      </div>
      <p className="ChartSourceController-description">{description}</p>
    </div>
  );
};


const Markup = ({ items, toggle, styling, changeSource, source, downloadText }) => {
  const { scale, color, rotated } = styling;
  return (
    <div className="ChartSourceController">
      <BarChart {...{ scale, color, rotated, items, downloadText }} />
      {toggle && buildToggle({ source, toggle, changeSource })}
    </div>
  );
};


class ChartSourceController extends Component {
  constructor(...props) {
    super(...props);

    const { initial, items } = this.props;

    this.state = {
      source: initial || Object.keys(items)[0],
    };

    this.events = {
      changeSource: this.changeSource.bind(this),
    };
  }

  changeSource(source) {
    this.setState({ source });
  }

  render() {
    const { items: rawItems, toggle, styling, downloadText } = this.props;
    const { source } = this.state;
    const { changeSource } = this.events;
    const items = rawItems[source];

    return <Markup {...{ items, toggle, styling, source, changeSource, downloadText }} />;
  }
}


export default ChartSourceController;
