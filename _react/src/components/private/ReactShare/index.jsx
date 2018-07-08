import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markup from './partials/Markup';
import { createModal } from './../../../redux/modules/modal';
import './styles.css';


class Share extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'link',
    };

    this.events = {
      showLink: this.showLink.bind(this),
      updateShare: this.updateShare.bind(this),
    };
  }

  updateShare(selected) {
    return this.setState({ selected });
  }

  showLink(markup) {
    const { createModal } = this.props;
    return createModal('Share this link', markup);
  }

  render() {
    const { anchor } = this.props;
    const { selected } = this.state;
    const { updateShare, showLink } = this.events;
    return <Markup {...{ selected, anchor, updateShare, showLink }} />;
  }
}


const getProps = (dispatch, ownProps) => {
  return {
    createModal: (title, markup) => dispatch(createModal(title, markup)),
    ...ownProps,
  };
};


export default connect(null, getProps)(Share);
