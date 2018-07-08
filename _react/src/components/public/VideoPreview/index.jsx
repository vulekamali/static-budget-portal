import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import './styles.css'
import Markup from './partials/Markup.jsx';
import { createModal } from './../../../redux/modules/modal.js';


class VideoPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    }

    this.events = {
      setLoading: this.setLoading.bind(this),
      showVideo: this.showVideo.bind(this),
    }
  }

  showVideo(content, language) {
    const { createModal, title } = this.props;
    ReactGA.modalview(`Viewed '${title}' video in ${language}`);
    return createModal(title, content);
  }

  setLoading(loading) {
    this.setState({ loading })
  }

  componentDidMount() {
    const { loading } = this.props;

    if (loading) {
      return null;
    }

    return this.setLoading(false);
  }

  render() {
    const { title, description, languages, selected } = this.props;
    const { showVideo } = this.events;
    const { loading } = this.state;

    return (
      <Markup {...{ 
        title,
        description,
        languages,
        selected,
        showVideo,
        loading,
      }} />
    )
  }
}


const getActions = (dispatch, ownProps) => {
  return {
    createModal: (title, markup) => dispatch(createModal(title, markup)),
    ...ownProps,
  }
};


export default connect(null, getActions)(VideoPreview)


VideoPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  languages: PropTypes.objectOf(PropTypes.string).isRequired,
}


VideoPreview.defaultProps = {
  description: null,
}
