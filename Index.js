import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './stores/store';
import App from './App';

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
