import React, { Component } from 'react';
import {connect} from 'react-redux';
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
  
const AsyncGroups = asyncComponent(() => {
    return import ('./Groups/Groups');
});

const AsyncPoets= asyncComponent(() => {
    return import ('./Poets/Poets');
});
 

class MainContent extends Component {
    state = {
        mainProp: {
            post: {
                path: '/index/post',
                icnGrp: 'clone',
                icnClass: 'icon icon__site-main__content--tab',
                title: 'Post',
                active: null
            },
            questions: {
                path: '/index/question',
                icnGrp: 'clone',
                icnClass: 'icon icon__site-main__content--tab',
                title: 'Questions',
                active: null
            },
            group: {
                path: '/index/group',
                icnGrp: 'users',
                icnClass: 'icon icon__site-main__content--tab',
                title: 'Groups',
                active: null
            },
            helpme: {
                path: '/index/helpme',
                icnGrp: 'hand-paper',
                icnClass: 'icon icon__site-main__content--tab',
                title: 'Help Me',
                active: null
            },
            poet: {
                path: '/index/poet',
                icnGrp: 'book',
                icnClass: 'icon icon__site-main__content--tab',
                title: 'Poet&Writers',
                active: null
            }
        }
    }

    componentDidMount() {
        this.props.onFetchMainActive(this.state.mainProp, this.props.userID)
    }

    render() {
        let mainProps = <MainNavigations 
            content={this.state.mainProp}/>;

        if (this.props.mainProps) {
            mainProps = <MainNavigations 
                content={this.props.mainProps}/>;
        }

        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <div className="site-main__content--top"></div>
                    <ul className="site-main__content--tab"> 
                        {mainProps}
                    </ul>  
                    <Switch>
                        <Route path="/index/post" exact component={AsyncPosts}/>
                        <Route path="/index/post/:id" exact component={AsyncPosts}/>
                        <Route path="/index/question" exact component={AsyncQuestions}/>
                        <Route path="/index/question/:id" component={AsyncQuestions}/>
                        <Route path="/index/helpme" exact component={AsyncHelpme}/>
                        <Route path="/index/helpme/:id" exact component={AsyncHelpme}/>
                        <Route path="/index/group" exact component={AsyncGroups}/>
                        <Route path="/index/group/:id" exact component={AsyncGroups}/>
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
        mainProps: state.main.mainProps,
       userID: state.auth.userID,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMainActive: (mainProps, userID) => dispatch(actions.fetchMainActiveInit(mainProps, userID))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));