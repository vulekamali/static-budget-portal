import React, { Component } from 'react';
import Markup from './partials/Markup.jsx';
import './styles.css';


export default class ReactVideoEmbed extends Component {
  constructor(props) {
    super(props)
    const { selected: initialSelected } = this.props;

    this.state = {
      selected: initialSelected,
    }

    this.events = {
      setSelected: this.setSelected.bind(this),
    }
  }

  setSelected(selected) {
    this.setState({ selected })
  }

  render() {
    const { languages } = this.props;
    const { selected } = this.state;
    const { setSelected } = this.events;
    return <Markup {...{ selected, setSelected, languages }} />
  }
}