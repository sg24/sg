import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/editpost/store/actions/index';
import App from '../../react/editpost/App';
import { editpostStore } from '../../react/hoc/withStore/withStore';

class Editpost extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default editpostStore(Editpost);