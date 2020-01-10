import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';

const AsyncPosts = asyncComponent(() => {
    return import ('./Posts/Posts');
});

const AsyncQuestions = asyncComponent(() => {
    return import ('./Questions/Questions');
});

const AsyncHelpme = asyncComponent(() => {
    return import ('./HelpMe/HelpMe');
});
  
const AsyncUsers = asyncComponent(() => {
    return import ('./Users/Users');
});

// const AsyncGroups = asyncComponent(() => {
//     return import ('./Groups/Groups');
// });

const AsyncPoets= asyncComponent(() => {
    return import ('./Poets/Poets');
});

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
        curTab: this.props.match.url.split('/')[2] ? this.props.match.url.split('/')[2] : 'Newsfeed',
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
                    removeActive={this.removeActiveHandler.bind(this, 'Newsfeed')}
                    active={this.state.curTab !== 'Newsfeed' ? this.props.ptActive : null}/>
                <MainNavigations 
                    content={this.state.questions}
                    removeActive={this.removeActiveHandler.bind(this, 'question')}
                    active={this.state.curTab !== 'question' ? this.props.queActive : null}/>
                <MainNavigations 
                    content={this.state.helpme}
                    removeActive={this.removeActiveHandler.bind(this, 'share')}
                    active={this.state.curTab !== 'share' ? this.props.shareCntActive : null}/>
                {/* <MainNavigations 
                    content={this.state.group}
                    removeActive={this.removeActiveHandler.bind(this, 'group')}
                    active={this.state.curTab !== 'group' ? this.props.cntActive : null}/> */}
                <MainNavigations 
                    content={this.state.user}
                    removeActive={this.removeActiveHandler.bind(this, 'scholars')}
                    active={this.state.curTab !== 'scholars' ? this.props.reqActive: null}/>
                <MainNavigations 
                    content={this.state.poet}
                    removeActive={this.removeActiveHandler.bind(this, 'writer')}
                    active={this.state.curTab !== 'writer' ? this.props.cntActive : null}/>
                </ul>
                <Switch>
                    <Route path="/index/post" exact component={AsyncPosts}/>
                    <Route path="/index/post/:id" exact component={AsyncPosts}/>
                    <Route path="/index/question" exact component={AsyncQuestions}/>
                    <Route path="/index/question/:id" component={AsyncQuestions}/>
                    <Route path="/index/helpme" exact component={AsyncHelpme}/>
                    <Route path="/index/helpme/:id" exact component={AsyncHelpme}/>
                    {/* <Route path="/index/group" exact component={AsyncGroups}/>
                    <Route path="/index/group/:id" exact component={AsyncGroups}/> */}
                     <Route path="/index/user" exact component={AsyncUsers}/>
                    <Route path="/index/poet" exact component={AsyncPoets}/>
                    <Route path="/index/poet/:id" exact component={AsyncPoets}/>
                    <Route path="/"  component={AsyncPosts}/> 
                </Switch>
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