import React, { Component } from 'react';
import Markup from './partials/Markup.jsx';
import fetchWrapper from './../../../utilities/js/fetchWrapper';


export default class Documentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: null,
    }
  }

  componentDidMount() {
    const { url } = this.props; 
    fetchWrapper(url, { json: false })
      .then(markdown => this.setState({ markdown }))
      .catch(console.warn)
  }

  render() {
    const { markdown } = this.state;
    return <Markup {...{ markdown }} />;
  }
}