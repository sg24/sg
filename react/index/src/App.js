import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'; 

import Main from './components/Main/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
          <Main />
      </Layout>
    );
  }
}

export default App;
