import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../react/index/store/actions/index';
import App from '../react/index/containers/SiteMain/MainContent/Posts/Posts';
import { indexStore } from '../react/hoc/withStore/withStore';

class Posts extends Component {
    static async getInitialProps(props) {
        const { store, isServer, req } = props.ctx
            if (!store.getState().cnt.cnts && req && req.useragent && req.useragent.isBot) {
                store.dispatch(actions.fetchCntInit(null, 'post', 200, 0, 0))
            }
        //   return { cnts: store.getState().cnt.cnts }
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

export default indexStore(Posts);