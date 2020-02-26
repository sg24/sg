import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head'
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout'; 
import * as actions from './store/actions/index';
typeof window !== 'undefined' ? require('pepjs') : null
const serviceWorker = typeof window !== 'undefined' ? require('./serviceWorker'): null;
import Main from './containers/SiteMain/SiteMain';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './containers/Header/NavigationList/NavigationList.css'

library.add(fas,far,fab)

class App extends Component {
  componentDidMount() {
    // this.props.onCheckAuth();
  }
  render() {
    return (
      <Layout>
          <Head>
            <link rel="stylesheet" type="text/css" href="/static/index/App.css" />
            <link rel="stylesheet" type="text/css" href="/static/index/index.css" />
          </Head>
          <Main>
              { this.props.children }
          </Main>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
      verify: state.auth.verify,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCheckAuth: () => dispatch(actions.checkAuthInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

if (typeof window !== 'undefined') {
  serviceWorker.register();
}