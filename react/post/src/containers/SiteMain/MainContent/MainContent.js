import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';
import MainPost from './MainPost/MainPost'; 

class MainContent extends Component {
    state = {
        post: {
            path: '/post',
            icnGrp: 'newspaper',
            icnClass: 'icon icon__site-main--content__tab--clone',
            title: 'Feed',
        },
        share: {
            path: '/post/shared',
            icnGrp: 'location-arrow',
            icnClass: 'icon icon__site-main--content__tab--share',
            title: 'Shared',
        },
        showPtActive: true,
        showShareActive: true,
        ptFetch: false
    }

    componentDidUpdate() {
        let curTab = this.props.location.pathname.split('/').length > 2 ? this.props.location.pathname.split('/')[2] : this.props.location.pathname.split('/')[1];
        let cur = curTab === 'shared' ? {showShareActive: false} : {showPtActive: false}
        if (this.props.ptFetch && !this.state.ptFetch) {
            this.props.onResetActive(this.props.userID, curTab);
            this.setState({ptFetch: true, ...cur})
        }
    }

    removeActiveHandler = (curTab) => {
        this.props.onResetActive(this.props.userID, curTab);
        if (curTab === 'post') {
            this.setState((prevState, props) => {
                return {showPtActive: false,
                  showShareActive: true  
                }
            });
            return
        }
        this.setState((prevState, props) => {
            return {
              showPtActive: true,
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
                        content={this.state.post}
                        removeActive={this.removeActiveHandler.bind(this, 'post')}
                        active={this.state.showPtActive ? this.props.ptActive : null}/>
                    <MainNavigations 
                        content={this.state.share}
                        removeActive={this.removeActiveHandler.bind(this, 'shared')}
                        active={this.state.showShareActive ? this.props.shareCntActive : null}/>
                    </ul>
                    <MainPost />
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
       ptActive: state.main.ptActive,
       ptFetch: state.pt.post !== null,
       showLoader: state.pt.showLoader
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetActive: (userID, curTab) => dispatch(actions.resetActiveInit(userID, curTab))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));