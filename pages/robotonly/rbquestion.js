import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/index/store/actions/index';
import App from '../../react/index/containers/SiteMain/MainContent/Questions/Questions';
import { indexStore } from '../../react/hoc/withStore/withStore';

class Questions extends Component {
    static async getInitialProps(props) {
        const { store, isServer, req } = props.ctx
        if (!store.getState().cnt.cnts) {
            store.dispatch(actions.fetchCntInit(null, 'question', 200, 0, 0))
            store.dispatch(actions.fetchTrdInit(null))
        }
  
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

export default indexStore(Questions);