import React, { Component } from 'react';
import Markup from './Markup';



class ChartSection extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.state = {
      modal: false,
      selected: null
    }

    this.events = {
      openModal: this.openModal.bind(this),
      closeModal: this.closeModal.bind(this),
      eventHandler: this.eventHandler.bind(this),
    }
  }

  openModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  eventHandler(e) {
    this.setState({ selected: e });
  }

  render() {
    const { state, events, props } = this;

    const passedProps = {
      ...props,
      modal: state.modal,
      openModal: events.openModal,
      closeModal: events.closeModal,
      eventHandler: events.eventHandler,
      selected: state.selected
    };

    return <Markup {...passedProps } />
  }
}


export default ChartSection;
