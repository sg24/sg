import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';

import Layout from './hoc/Layout/Layout'; 
const serviceWorker = typeof window !== 'undefined' ? require('./serviceWorker'): null;
import Main from './containers/SiteMain/SiteMain';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './index.css';

library.add(fas,far,fab)

class App extends Component {
  render() {
    return (
      <Layout>
        <Head>
            <link rel="stylesheet" type="text/css" href="/static/signup/Form.css" />
          </Head>
          <Main />
      </Layout>
    );
  }
}

export default App;

if (typeof window !== 'undefined') {
  serviceWorker.register();
}