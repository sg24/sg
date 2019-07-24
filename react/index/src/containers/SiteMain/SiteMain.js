import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainNav from './MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';;

const AsyncShare= asyncComponent(() => {
    return import ('./Share/Share');
});

class SiteMain extends Component {
    render() {
        return (
            <div className="site-main" onClick={this.props.onNavDefault}>
            <div className="wrapper__exmain">
                <MainContent />
                <MainNav />
            </div>
            <Route path="/index/share" component={AsyncShare} />
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault())
    };
};
export default withRouter(connect(null, mapDispatchToProps)(SiteMain)); 