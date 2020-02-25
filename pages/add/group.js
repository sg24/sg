import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/addgroup/store/actions/index';
import App from '../../react/addgroup/App';
import { addgroupStore } from '../../react/hoc/withStore/withStore';

class Addgroup extends Component {
  render() {
      return (
        <Provider store={this.props.store}>
          <App />
        </Provider>
      )
  }
}

export default addgroupStore(Addgroup);