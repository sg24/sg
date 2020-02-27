import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/addpoet/store/actions/index';
import App from '../../react/addpoet/App';
import { addpoetStore } from '../../react/hoc/withStore/withStore';

class Addpoet extends Component {
  static async getInitialProps(props) {
    const { store, isServer, req } = props.ctx
    return {}
}
    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}

export default addpoetStore(Addpoet);