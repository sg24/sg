import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { withRouter } from 'next/router';

import * as actions from '../../react/index/store/actions/index';
import App from '../../react/view/App';
import { viewStore } from '../../react/hoc/withStore/withStore';

class Model extends Component {
    static async getInitialProps(props) {
      const { store, isServer, req } = props.ctx
      if (!store.getState().cnt.cnts && req && req.useragent && req.useragent.isBot) {
        store.dispatch(actions.fetchCntInit(ctx.req.params.categ, ctx.req.params.id))
        store.dispatch(actions.fetchTrdInit(ctx.req.params.categ, ctx.req.params.id))
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


export default withRouter(viewStore(Model));