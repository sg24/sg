import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'; 
import * as actions from './store/actions/index';

import Main from './containers/SiteMain/SiteMain';
import './App.css';

class App extends Component {
    static async getInitialProps({store}) {
        store.dispatch(actions.fetchCntReset())
        return {}
    }

  render() {
    return (
      <Layout>
          <Main>
              { this.props.children }
          </Main>
      </Layout>
    );
  }
}

export default App;
