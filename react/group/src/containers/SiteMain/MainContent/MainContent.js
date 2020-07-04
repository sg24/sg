import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';
import MainGrp from './MainGrp/MainGrp'; 

class MainContent extends Component {
    state = {
        cnt: {
            path: '/group',
            icnGrp: 'users',
            icnClass: 'icon icon__site-main--content__tab',
            title: 'Room',
        },
        request: {
            path: '/group/request',
            icnGrp: 'user-plus',
            icnClass: 'icon icon__site-main--content__tab',
            title: 'Request',
        },
        join: {
            path: '/group/joined',
            icnGrp: 'plus',
            icnClass: 'icon icon__site-main--content__tab',
            title: 'Joined',
        },
        curTab: this.props.location.pathname.split('/')[2] ? this.props.location.pathname.split('/')[2] : 'cnt',
        cntFetch: false
    }

    componentDidUpdate() {
        if (this.props.cntFetch && !this.state.cntFetch) {
            this.props.onResetActive(this.props.userID, this.state.curTab);
            this.setState({cntFetch: true})
        }
    }

    removeActiveHandler = (curTab) => {
        if (this.state.curTab !== curTab) {
            this.props.onResetActive(this.props.userID, curTab);
            this.setState({curTab})
        }
    }

    render() {
        let loaderCnt = null;

        if (this.props.showLoader) {
            loaderCnt = (
                <div className="site-main__content--loader">
                    <Loader />
                </div>
            )
        }

        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <ul className="site-main__content--tab">
                    <MainNavigations 
                    content={this.state.cnt}
                    removeActive={this.removeActiveHandler.bind(this, 'cnt')}
                    active={this.state.curTab !== 'cnt' ? this.props.cntActive : null}/>
                    <MainNavigations 
                    content={this.state.request}
                    removeActive={this.removeActiveHandler.bind(this, 'request')}
                    active={this.state.curTab !== 'request' ? this.props.reqActive : null}/>
                    <MainNavigations 
                    content={this.state.join}
                    removeActive={this.removeActiveHandler.bind(this, 'join')}
                    active={this.state.curTab !== 'join' ? this.props.joinActive : null}/>
                    </ul>
                    <MainGrp />
                    { loaderCnt }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID,
       reqActive: state.main.reqActive,
       joinActive: state.main.joinActive,
       cntFetch: state.cnt.cnts !== null,
       showLoader: state.cnt.showLoader
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetActive: (userID, curTab) => dispatch(actions.resetActiveInit(userID, curTab))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));