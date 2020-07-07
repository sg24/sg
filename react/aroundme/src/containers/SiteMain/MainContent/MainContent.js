import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';
import MainAround from './MainAround/MainAround'; 

class MainContent extends Component {
    state = {
        cnt: {
            path: '/aroundme',
            icnGrp: 'clone',
            icnClass: 'icon icon__site-main--content__tab',
            title: 'Post',
        },
        share: {
            path: '/aroundme/shared',
            icnGrp: 'location-arrow',
            icnClass: 'icon icon__site-main--content__tab',
            title: 'Shared',
        },
        showCntActive: true,
        showShareActive: true,
        cntFetch: false
    }

    componentDidUpdate() {
        if (this.props.cntFetch && !this.state.cntFetch) {
            let curTab = this.props.location.pathname.split('/').length > 2 ? this.props.location.pathname.split('/')[2] : this.props.location.pathname.split('/')[1];
            let cur = curTab === 'shared' ? {showShareActive: false} : {showCntActive: false}
            this.props.onResetActive(this.props.userID, curTab);
            this.setState({cntFetch: true, ...cur})
        }
    }

    removeActiveHandler = (curTab) => {
        this.props.onResetActive(this.props.userID, curTab);
        if (curTab === 'aroundme') {
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
                        removeActive={this.removeActiveHandler.bind(this, 'aroundme')}
                        active={this.state.showCntActive ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.share}
                        removeActive={this.removeActiveHandler.bind(this, 'shared')}
                        active={this.state.showShareActive ? this.props.shareCntActive : null}/>
                    </ul>
                    <MainAround />
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