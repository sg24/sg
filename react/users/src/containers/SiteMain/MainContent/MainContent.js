import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import MainModel from './MainModel/MainModel'; 

class MainContent extends Component {
    state = {
        cnt: {
            path: '/users',
            icnGrp: 'users',
            icnClass: 'icon icon__site-main--user__tab',
            title: 'Users',
        },
        request: {
            path: '/users/request',
            icnGrp: 'user-friends',
            icnClass: 'icon icon__site-main--user__tab',
            title: 'Request',
        },
        curTab: 'users',
        showCntActive: false,
        showRequestActive: true,
        updateTab: ''
    }

    componentDidUpdate() {
        if (this.state.curTab !== this.state.updateTab) {
            this.setState({updateTab: this.state.curTab})
        }
    }

    removeActiveHandler = (curTab) => {
        if (curTab === 'users') {
            this.setState((prevState, props) => {
                return {
                    showCntActive: false,
                    showRequestActive: true,
                    curTab: 'users'  
                }
            });
            return
        }
        this.props.onResetActive(this.props.userID, curTab);
        this.setState((prevState, props) => {
            return {
              showCntActive: true,
              showRequestActive: false,
              curTab: 'request'
            }
        });
    }

    render() {
        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <ul className="site-main__content--tab">
                    <MainNavigations 
                        content={this.state.cnt}
                        removeActive={this.removeActiveHandler.bind(this, 'users')}
                        active={null}/>
                    <MainNavigations 
                        content={this.state.request}
                        removeActive={this.removeActiveHandler.bind(this, 'request')}
                        active={this.state.showRequestActive ? this.props.reqActive : null}/>
                    </ul>
                    <MainModel />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID,
       reqActive: state.main.reqActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetActive: (userID, curTab) => dispatch(actions.resetActiveInit(userID, curTab))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));