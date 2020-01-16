import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';
import MainModel from './MainModel/MainModel'; 

class MainContent extends Component {
    state = {
        cnt: {
            path: '/poet',
            icnGrp: 'book',
            icnClass: 'icon icon__site-main__ptwrit--tab',
            title: 'Writers',
        },
        share: {
            path: '/poet/shared',
            icnGrp: 'location-arrow',
            icnClass: 'icon icon__site-main__ptwrit--tab',
            title: 'Shared',
        },
        showCntActive: true,
        showShareActive: true,
        cntFetch: false
    }

    componentDidUpdate() {
        let curTab = this.props.location.pathname.split('/').length > 2 ? this.props.location.pathname.split('/')[2] : this.props.location.pathname.split('/')[1];
        let cur = curTab === 'shared' ? {showShareActive: false} : {showCntActive: false}
        if (this.props.cntFetch && !this.state.cntFetch) {
            this.props.onResetActive(this.props.userID, curTab);
            this.setState({cntFetch: true, ...cur})
        }
    }

    removeActiveHandler = (curTab) => {
        this.props.onResetActive(this.props.userID, curTab);
        if (curTab === 'poet') {
            this.setState((prevState, props) => {
                return {showCntActive: false,
                  showShareActive: true  
                }
            });
            return
        }
        this.setState((prevState, props) => {
            return {
              showCntActive: true,
              showShareActive: false
            }
        });
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
                        removeActive={this.removeActiveHandler.bind(this, 'poet')}
                        active={this.state.showCntActive ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.share}
                        removeActive={this.removeActiveHandler.bind(this, 'shared')}
                        active={this.state.showShareActive ? this.props.shareCntActive : null}/>
                    </ul>
                    <MainModel />
                    { loaderCnt }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID,
       shareCntActive: state.main.shareCntActive,
       cntActive: state.main.cntActive,
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