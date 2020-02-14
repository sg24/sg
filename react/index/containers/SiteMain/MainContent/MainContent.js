import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'

import * as actions from '../../../store/actions/index';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';

class MainContent extends Component {
    state = {
        post: {
            path: '/index/post',
            icnGrp: 'newspaper',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'News feed'
        },
        questions: {
            path: '/index/question',
            icnGrp: 'question',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Questions'
        },
        // group: {
        //     path: '/index/group',
        //     icnGrp: 'users',
        //     icnClass: 'icon icon__site-main__content--tab',
        //     title: 'Groups'
        // },
        user: {
            path: '/index/user',
            icnGrp: 'users',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Scholars',
        },
        helpme: {
            path: '/index/helpme',
            icnGrp: 'hand-paper',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Q Chat'
        },
        poet: {
            path: '/index/poet',
            icnGrp: 'book',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Writers'
        },
        curTab: this.props.router.pathname.split('/')[2] ? this.props.router.pathname.split('/')[2] : 'post',
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
                    content={this.state.post}
                    removeActive={this.removeActiveHandler.bind(this, 'post')}
                    active={this.state.curTab !== 'post' ? this.props.ptActive : null}/>
                <MainNavigations 
                    content={this.state.questions}
                    removeActive={this.removeActiveHandler.bind(this, 'question')}
                    active={this.state.curTab !== 'question' ? this.props.queActive : null}/>
                <MainNavigations 
                    content={this.state.helpme}
                    removeActive={this.removeActiveHandler.bind(this, 'helpme')}
                    active={this.state.curTab !== 'helpme' ? this.props.shareCntActive : null}/>
                {/* <MainNavigations 
                    content={this.state.group}
                    removeActive={this.removeActiveHandler.bind(this, 'group')}
                    active={this.state.curTab !== 'group' ? this.props.cntActive : null}/> */}
                <MainNavigations 
                    content={this.state.user}
                    removeActive={this.removeActiveHandler.bind(this, 'user')}
                    active={this.state.curTab !== 'user' ? this.props.reqActive: null}/>
                <MainNavigations 
                    content={this.state.poet}
                    removeActive={this.removeActiveHandler.bind(this, 'poet')}
                    active={this.state.curTab !== 'poet' ? this.props.cntActive : null}/>
                </ul>
                { this.props.children }
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
       ptActive: state.main.ptActive,
       queActive: state.main.queActive,
       reqActive: state.main.reqActive,
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