import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import MainNavigation from '../../../components/MainNavigation/MainNavigation';

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

    shouldComponentUpdate(state, props) {
        return false;
    }

    render() {
        return (
            <div className="site-main__content">
                <div className="site-main__content--wrapper">
                    <div className="site-main__content--top"></div>
                    <ul className="site-main__content--tab site-main__content--tab__sticky"> 
                        <MainNavigation path="/index/post" icnGrp="clone" icnClass="icon icon__site-main__content--tab">
                            Post
                        </MainNavigation>
                        <MainNavigation path="/index/question" icnGrp="clone" icnClass="icon icon__site-main__content--tab">
                            Questions
                        </MainNavigation>
                        {/* <li>Questions
                                <div className="active__main active__main--tab">
                                <div>9</div>
                            </div>
                        </li> */}
                        <MainNavigation path="/index/group" icnGrp="users" icnClass="icon icon__site-main__content--tab">
                            Groups
                        </MainNavigation>
                        <MainNavigation path="/index/helpme" icnGrp="hand-paper" icnClass="icon icon__site-main__content--tab">
                            Help Me
                        </MainNavigation>
                        <MainNavigation path="/index/poet" icnGrp="book" icnClass="icon icon__site-main__content--tab">
                            Poet&Writers
                        </MainNavigation>
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

export default withRouter(MainContent);