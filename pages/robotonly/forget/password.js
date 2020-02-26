import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/forgetpassword/store/actions/index';
import App from '../../react/forgetpassword/App';
import { forgetpassStore } from '../../react/hoc/withStore/withStore';

class ForgetPass extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default forgetpassStore(ForgetPass);