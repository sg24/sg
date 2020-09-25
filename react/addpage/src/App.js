import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout'; 
import * as actions from './store/actions/index';

import Main from './containers/SiteMain/SiteMain';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuth();
  }

  render() {
    return (
      <Layout>
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
