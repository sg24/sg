import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/editque/store/actions/index';
import App from '../../react/editque/App';
import { editqueStore } from '../../react/hoc/withStore/withStore';

class Editque extends Component {
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default editqueStore(Editque);