import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/addpost/store/actions/index';
import App from '../../react/addpost/App';
import { addpostStore } from '../../react/hoc/withStore/withStore';

class Addpost extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default addpostStore(Addpost);