import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch,Route } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import MainContent from './MainContent/MainContent';
import MainNav from './MainNav/MainNav'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';

const AsyncShare= asyncComponent(() => {
    return import ('./Share/Share');
});

const AsyncFilterContent= asyncComponent(() => {
    return import ('./MainContent/MainPost/Filter/FilterContent/FilterContent');
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
               {this.props.showBackdrop ? 
                    <Backdrop   
                        show={ this.props.showBackdrop }
                        component={ AsyncFilterContent }/> : null}
                { this.props.postErr ? 
                    <Backdrop 
                        component={ Modal }
                        err={ this.props.postErr } /> : null}
                <Switch>
                    <Route path="/post" exact component={MainContent} />
                    <Route path="/post/:id" exact component={MainContent} />
                </Switch>
                <MainNav />
            </div>
            <Route path="/post/share" exact component={AsyncShare} />
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
         default: state.header.default,
         showBackdrop: state.main.showBackdrop,
         postErr: state.pt.postErr
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onNavDefault: () => dispatch(actions.headerNavDefault())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteMain)); 