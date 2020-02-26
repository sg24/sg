import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/resetpass/store/actions/index';
import App from '../../react/resetpass/App';
import { resetpassStore } from '../../react/hoc/withStore/withStore';

class Reset extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default resetpassStore(Reset);