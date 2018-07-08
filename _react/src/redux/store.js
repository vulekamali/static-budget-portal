import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import modal from './modules/modal.js';
import initialState from './initialState.js';


export default createStore(modal, initialState, composeWithDevTools());