import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import './MainContent.css';
import * as actions from '../../../store/actions/index';
import Category from './Category/Category';
import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import MainNavigations from '../../../components/MainNavigations/MainNavigations';
import Loader from '../../../components/UI/Loader/Loader';
import axios from '../../../axios';

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

const AsyncGroups = asyncComponent(() => {
    return import ('./Groups/Groups');
});

const AsyncPoets= asyncComponent(() => {
    return import ('./Poets/Poets');
});

const AsyncAdverts = asyncComponent(() => {
    return import ('./Adverts/Adverts');
});

const AsyncAroundme = asyncComponent(() => {
    return import ('./Aroundme/Aroundme');
});

class MainContent extends Component {
    state = {
        post: {
            path: '/index/post',
            icnGrp: 'newspaper',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Feeds'
        },
        aroundme: {
            path: '/index/aroundme',
            icnGrp: 'map-marker-alt',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Around Me'
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
            title: 'Users',
        },
        advert: {
            path: '/index/advert',
            icnGrp: 'bullhorn',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Advert',
        },
       group: {
            path: '/index/group',
            icnGrp: 'comment-alt',
            icnClass: 'icon icon__site-main__content--tab',
            title: 'Room',
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
            title: 'Write Up'
        },
        curTab: this.props.location.pathname.split('/')[2] ? this.props.location.pathname.split('/')[2] : 'post',
        cntFetch: false,
        active: null
    }

    componentDidMount() {
        let numberOfAjaxCAllPending = 0;
        let these = this;

        axios.interceptors.request.use(function (config) {
            numberOfAjaxCAllPending++;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            numberOfAjaxCAllPending--;
            if (numberOfAjaxCAllPending === 0 && these.props.status) {
                let active = setTimeout(() => {
                    these.props.onFetchShareActive();
                    these.props.onFetchShareCntActive();
                    these.props.onFetchNotifyActive();
                    these.props.onFetchNavActive();
                    these.props.onFetchCntActive();
                    these.props.onFetchQueActive();
                    these.props.onFetchPtActive();
                    these.props.onFetchReqActive();
                    these.props.onFetchJoinActive();
                    clearTimeout(these.state.active)
                    clearTimeout(active)
                }, 20000);
                these.setState({active})
            }
        
            return response;
        }, function (error) {
            numberOfAjaxCAllPending--;
        });
    }

    componentWillUnmount() {
        if (this.state.active) {
            clearTimeout(this.state.active)
        }
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

    addAroundmeHandler = () => {
        this.props.history.push('/index/add/aroundme')
    }

    render() {
        let loaderCnt = null;
        let categ = (
            <div className="reuse-filter">
                <div className="reuse-filter__wrapper">
                { this.props.path !== '/users' && this.props.path !== '/helpme' ? <Category /> : null}
                <div className="reuse-filter__add">
                    <a href={this.props.path}>
                        More Filter
                    </a>
                </div>
                </div>
            </div>
        )

        let addAroundMe = (
            <div className="reuse-filter">
                <div className="reuse-filter__wrapper">
                <div className="reuse-filter__add" onClick={this.addAroundmeHandler}>
                    <div>
                        ADD
                    </div>
                </div>
                </div>
            </div>
        )

        let addAdvert = (
            <div className="reuse-filter">
                <div className="reuse-filter__wrapper">
                    <Category />
                    <div className="reuse-filter__add">
                        <a href="/add/advert">
                            ADD
                        </a>
                    </div>
                </div>
            </div>
        );

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
                    content={this.state.aroundme}
                    removeActive={this.removeActiveHandler.bind(this, 'aroundme')}
                    active={null}/>
                <MainNavigations 
                    content={this.state.questions}
                    removeActive={this.removeActiveHandler.bind(this, 'question')}
                    active={this.state.curTab !== 'question' ? this.props.queActive : null}/>
                <MainNavigations 
                    content={this.state.helpme}
                    removeActive={this.removeActiveHandler.bind(this, 'helpme')}
                    active={this.state.curTab !== 'helpme' ? this.props.shareCntActive : null}/>
                <MainNavigations 
                    content={this.state.advert}
                    removeActive={this.removeActiveHandler.bind(this, 'advert')}
                    active={null}/>
                {/* <MainNavigations 
                    content={this.state.group}
                    removeActive={this.removeActiveHandler.bind(this, 'group')}
                    active={this.state.curTab !== 'group' ? this.props.cntActive : null}/> */}
                <MainNavigations 
                    content={this.state.user}
                    removeActive={this.removeActiveHandler.bind(this, 'user')}
                    active={this.state.curTab !== 'user' ? this.props.reqActive: null}/>
                    <MainNavigations 
                    content={this.state.group}
                    removeActive={this.removeActiveHandler.bind(this, 'group')}
                    active={this.state.curTab !== 'group' ? this.props.joinActive: null}/>
                <MainNavigations 
                    content={this.state.poet}
                    removeActive={this.removeActiveHandler.bind(this, 'poet')}
                    active={this.state.curTab !== 'poet' ? this.props.cntActive : null}/>
                </ul>
                {this.props.status && (this.props.path === '/users' || this.props.path === '/group')
                ? categ: null }
                {this.props.path !== '/users' && this.props.path !== '/group' && this.props.path !== '/helpme' && this.props.path !== '/aroundme' && this.props.path !== '/advert'  ? categ : null }
                {this.props.path === '/aroundme'  ? addAroundMe : null }
                {this.props.path === '/advert'  ? addAdvert : null }
                <Switch>
                    <Route path="/index/post" exact component={AsyncPosts}/>
                    <Route path="/index/post/:id" exact component={AsyncPosts}/>
                    <Route path="/index/aroundme"  component={AsyncAroundme}/>
                    <Route path="/index/question" exact component={AsyncQuestions}/>
                    <Route path="/index/question/:id" exact component={AsyncQuestions}/>
                    <Route path="/index/helpme" exact component={AsyncHelpme}/>
                    <Route path="/index/helpme/:id" exact component={AsyncHelpme}/>
                    <Route path="/index/group/:id" exact component={AsyncGroups}/>
                    <Route path="/index/group"  component={AsyncGroups}/>
                     <Route path="/index/user" exact component={AsyncUsers}/>
                    <Route path="/index/poet" exact component={AsyncPoets}/>
                    <Route path="/index/poet/:id" exact component={AsyncPoets}/>
                    <Route path="/index/advert/:id" exact component={AsyncAdverts}/>
                    <Route path="/index/advert"  component={AsyncAdverts}/>
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
       status: state.auth.status,
       shareCntActive: state.main.shareCntActive,
       cntActive: state.main.cntActive,
       ptActive: state.main.ptActive,
       queActive: state.main.queActive,
       reqActive: state.main.reqActive,
       joinActive: state.main.joinActive,
       cntFetch: state.cnt.cnts !== null,
       showLoader: state.cnt.showLoader,
       path: state.tags.path
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchJoinActive: () => dispatch(actions.fetchJoinActiveInit()),
        onResetActive: (userID, curTab) => dispatch(actions.resetActiveInit(userID, curTab)),
        onFetchShareActive: () => dispatch(actions.fetchShareactiveInit()),
        onFetchShareCntActive: () => dispatch(actions.fetchShareCntactiveInit()),
        onFetchQueActive: () => dispatch(actions.fetchQueActiveInit()),
        onFetchPtActive: () => dispatch(actions.fetchPtActiveInit()),
        onFetchCntActive: () => dispatch(actions.fetchCntActiveInit()),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit()),
        onFetchReqActive: () => dispatch(actions.fetchReqActiveInit()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContent));