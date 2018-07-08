import ReactHtmlConnector from 'react-html-connector';
import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider as provider } from 'react-redux';
import store from './../../redux/store';


const { connect } = new ReactHtmlConnector(
  createElement, 
  render,
  { 
    provider,
    store,
  }
);


export default connect;