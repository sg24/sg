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
                    </ul>
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