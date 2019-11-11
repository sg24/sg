import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import MainPost from './MainPost/MainPost'; 

class MainContent extends Component {
    state = {
        post: {
            path: '/post',
            icnGrp: 'clone',
            icnClass: 'icon icon__site-main--content__tab--clone',
            title: 'Post',
        },
        share: {
            path: '/post/shared',
            icnGrp: 'location-arrow',
            icnClass: 'icon icon__site-main--content__tab--share',
            title: 'Shared',
        },
        showPtActive: false,
        showShareActive: true,
        ptFetch: false
    }

    componentDidUpdate() {
        if (this.props.ptFetch && !this.state.ptFetch) {
            this.props.onResetActive(this.props.userID, 'post');
            this.setState({ptFetch: true})
        }
    }

    removeActiveHandler = (curTab) => {
        this.props.onResetActive(this.props.userID, curTab);
        if (curTab === 'post') {
            this.setState((prevState, props) => {
                return {showPtActive: !prevState.showPtActive,
                  showShareActive: true  
                }
            });
            return
        }
        this.setState((prevState, props) => {
            return {
              showPtActive: true,
              showShareActive: !prevState.showShareActive  
            }
        });
    }

    render() {
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
                        removeActive={this.removeActiveHandler.bind(this, 'share')}
                        active={this.state.showShareActive ? this.props.shareActive : null}/>
                    </ul>
                    <MainPost />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID,
       shareActive: state.main.shareActive,
       ptActive: state.main.ptActive,
       ptFetch: state.pt.post !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetActive: (userID, curTab) => dispatch(actions.resetActiveInit(userID, curTab))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));