import React, { Component } from 'react';
import { Provider } from 'react-redux';

import * as actions from '../../react/index/store/actions/index';
import App from '../../react/index/containers/SiteMain/MainContent/Poets/Poets';
import { indexStore } from '../../react/hoc/withStore/withStore';

class Model extends Component {
    static async getInitialProps(props) {
        const { store, isServer } = props.ctx
            store.dispatch(actions.fetchCntReset())
  
          if (!store.getState().cnt.cnts) {
            store.dispatch(actions.fetchCntInit(null, 'poet', 6, 0, 0))
            store.dispatch(actions.changeTagsPath('/poet'));
            store.dispatch(actions.fetchTrdInit(null));
          }
  
          return {  }
    }

    render() {
        return (
          <Provider store={this.props.store}>
            <App />
          </Provider>
        )
    }
}


export default indexStore(Model);