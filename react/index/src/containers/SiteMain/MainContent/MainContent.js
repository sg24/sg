import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import MainNavigations from '../../../components/MainNavigations/MainNavigations'; 

const AsyncPosts = asyncComponent(() => {
    return import ('./Posts/Posts');
});

const AsyncQuestions = asyncComponent(() => {
    return import ('./Questions/Questions');
});

const AsyncHelpme = asyncComponent(() => {
    return import ('./HelpMe/HelpMe');
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
            icnGrp: 'clone',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Post'
        },
        questions: {
            path: '/index/question',
            icnGrp: 'clone',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Questions'
        },
        group: {
            path: '/index/group',
            icnGrp: 'users',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Groups'
        },
        helpme: {
            path: '/index/helpme',
            icnGrp: 'hand-paper',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Help Me'
        },
        poet: {
            path: '/index/poet',
            icnGrp: 'book',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Poet&Writers'
        },
        curTab: 'post',
        updateTab: ''
    }

    componentDidMount() {
        this.props.onResetActive(this.props.userID, this.state.curTab);
    }

    removeActiveHandler = (curTab) => {
        if (this.state.curTab !== curTab) {
            this.props.onResetActive(this.props.userID, curTab);
            this.setState({curTab})
        }
    }

    render() {
        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <ul className="site-main__content--tab">
                    <MainNavigations 
                        content={this.state.post}
                        removeActive={this.removeActiveHandler.bind(this, 'post')}
                        active={this.state.curTab === 'post' ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.questions}
                        removeActive={this.removeActiveHandler.bind(this, 'question')}
                        active={this.state.curTab === 'question' ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.helpme}
                        removeActive={this.removeActiveHandler.bind(this, 'helpme')}
                        active={this.state.curTab === 'helpme' ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.group}
                        removeActive={this.removeActiveHandler.bind(this, 'group')}
                        active={this.state.curTab === 'group' ? this.props.cntActive : null}/>
                    <MainNavigations 
                        content={this.state.poet}
                        removeActive={this.removeActiveHandler.bind(this, 'poet')}
                        active={this.state.curTab === 'poet' ? this.props.cntActive : null}/>
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
                        <Route path="/index/poet" exact component={AsyncPoets}/>
                        <Route path="/index/poet/:id" exact component={AsyncPoets}/>
                        <Route path="/"  component={AsyncPosts}/> 
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       userID: state.auth.userID,
       cntActive: state.main.cntActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetActive: (userID, curTab) => dispatch(actions.resetActiveInit(userID, curTab)),
        onFetchCntReset: () => dispatch(actions.fetchCntReset())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));