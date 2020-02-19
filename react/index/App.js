import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


import Layout from './hoc/Layout/Layout'; 
import * as actions from './store/actions/index';
typeof window !== 'undefined' ? require('pepjs') : null
typeof window !== 'undefined' ? require('events-polyfill') : null
const serviceWorker = typeof window !== 'undefined' ? require('./serviceWorker'): null;
import Main from './containers/SiteMain/SiteMain';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './index.css';
import './containers/Header/NavigationList/NavigationList.css'
import './App.css';

library.add(fas,far,fab)

class App extends Component {
    static async getInitialProps({store}) {
        store.dispatch(actions.checkAuthInit())
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

if (typeof window !== 'undefined') {
  serviceWorker.register();
}