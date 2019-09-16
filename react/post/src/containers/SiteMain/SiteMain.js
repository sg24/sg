import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainNav from './MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const AsyncShare= asyncComponent(() => {
    return import ('./Share/Share');
});

class SiteMain extends Component {
    checkHeaderDefault = () => {
        if (!this.props.default) {
            this.props.onNavDefault()
        }
    }

    render() {
        return (
            <div className="site-main site-main__expage" onClick={this.checkHeaderDefault}>
            <div className="wrapper__exmain">
                <MainContent />
                <MainNav />
            </div>
            <Route path="/post/share" component={AsyncShare} />
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
         default: state.header.default
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 