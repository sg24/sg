import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import MainPost from './MainPost/MainPost'; 

class MainContent extends Component {
    state = {
        mainNavProps: {
            post: {
                path: '/post',
                icnGrp: 'clone',
                icnClass: 'icon icon__site-main--content__tab--clone',
                title: 'Post',
                active: null
            },
            share: {
                path: '/post/shared',
                icnGrp: 'location-arrow',
                icnClass: 'icon icon__site-main--content__tab--share',
                title: 'Shared',
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
                        { mainNavProps }
                    </ul>
                    <MainPost />
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

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);