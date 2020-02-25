import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../react/signup/store/actions/index';
import App from '../react/signup/App';
import { signupStore } from '../react/hoc/withStore/withStore';

class Signup extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default signupStore(Signup);