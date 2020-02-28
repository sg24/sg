import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/login/store/actions/index';
import App from '../../react/login/App';
import { loginStore } from '../../react/hoc/withStore/withStore';

class Login extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default loginStore(Login);