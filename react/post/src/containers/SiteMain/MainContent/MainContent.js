import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';

class MainContent extends Component {
    state = {
        mainNavProps: {
            post: {
                path: '/index/post',
                icnGrp: 'clone',
                icnClass: 'icon icon__site-main__content--tab',
                title: 'Post',
                active: null
            }
        }
    }

    componentDidMount() {
        this.props.onFetchMainActive(this.state.mainNavProps, this.props.userID)
    }

    render() {

        let mainNavProps = <MainNavigations 
            content={this.state.mainNavProps}/>;
  
        if (this.props.mainProps) {
            mainNavProps = <MainNavigations 
                content={this.props.mainProps}/>;
        }

        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <ul className="site-main__content--tab"> 
                        {mainNavProps}
                    </ul>  
                    <Switch>
                        
                    </Switch>
                </div>
            </div>
                
        );
    }
}

const mapStateToProps = state => {
    return {
        mainProps: state.main.mainProps,
       userID: state.auth.userID,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMainActive: (mainProps, userID) => dispatch(actions.fetchMainActiveInit(mainProps, userID))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));