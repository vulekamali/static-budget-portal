import { createStore } from 'redux';
import modalReducers from './components/header-and-footer/Modals/reducers.js';

/* eslint-disable no-underscore-dangle */
export default createStore(
  modalReducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
