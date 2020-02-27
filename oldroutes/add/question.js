import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/addque/store/actions/index';
import App from '../../react/addque/App';
import { addqueStore } from '../../react/hoc/withStore/withStore';

class Addque extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default addqueStore(Addque);