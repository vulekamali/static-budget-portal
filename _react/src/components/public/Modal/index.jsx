import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markup from './partials/Markup';
import { removeModal as reduxRemoveModal } from './../../../redux/modules/modal.js';
import './styles.css'


class Modal extends Component {
  constructor(props) {
    super(props);

    this.events = {
      closeModal: this.closeModal.bind(this),
    };
  }

  closeModal() {
    const { removeModal } = this.props;
    return removeModal();
  }

  render() {
    const { embed, title, markup } = this.props;
    const { closeModal } = this.events;
    return <Markup {...{ title, markup, closeModal, embed }} />;
  }
}


const getProps = (state, ownProps) => ({
  title: state.modal.title,
  markup: state.modal.markup,
})

const getActions = (dispatch, ownProps) => ({
  removeModal: () => dispatch(reduxRemoveModal()),
})


export default connect(getProps, getActions)(Modal)