import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import Head from 'next/head';

import Layout from './hoc/Layout/Layout'; 
import * as actions from './store/actions/index';
const serviceWorker = typeof window !== 'undefined' ? require('./serviceWorker'): null;
typeof window !== 'undefined' ? require('promise-polyfill') : null;
import Main from './containers/SiteMain/SiteMain';
import '@fortawesome/fontawesome-svg-core/styles.css';
// import './index.css';
import './containers/Header/NavigationList/NavigationList.css'

library.add(fas,far)


class App extends Component {
  componentDidMount() {
    this.props.onCheckAuth();
  }

  render() {
    return (
      <Layout>
         <Head>
            <link rel="stylesheet" type="text/css" href="/static/addpoet/Form.css" />
            <link rel="stylesheet" type="text/css" href="/static/addpoet/index.css" />
          </Head>
          <Main />
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
      onCheckAuth: (userID) => dispatch(actions.checkAuthInit()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

if (typeof window !== 'undefined') {
  serviceWorker.register();
}