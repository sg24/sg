import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NavigationList.css';
import * as actions from '../../../store/actions/index';
import NavigationLists from '../../../components/Navigation/NavigationLists/NavigationLists';
import Loader from '../../../components/UI/Loader/Loader';
import Aux from '../../../hoc/Auxs/Aux';

class NavigationList extends Component {
    state = {
        show: false,
        showNavList: false,
        showNavItm: false,
        default: false,
        category: null
    };

    componentDidUpdate() {
        if (this.state.showNavList && !this.state.default && this.props.hidNavList) {
            this.setState({
                default: true,
                show: false,
                showNavList: false
            });
        }
    }

    showNavTipHandler = () => {
       if (!this.state.showNavList) {
        this.setState({
            show: true
        });
       }
    }

    hidNavTipHandler = () => {
        this.setState({
            show: false
        });
    }

    showNavListHandler = () => {
        this.props.onshowNavList();
        this.setState((prevState, props) => {
            return {
                show: false,
                default: false,
                showNavList: prevState.showNavItm ? true : !prevState.showNavList,
                showNavItm: false
            }
        });
    }

    showNavItmHandler = () => {
        this.props.onshowNavList();
        this.setState((prevState, props) => {
            return {
                showNavItm: true,
                show: false,
                default: false,
                showNavList: prevState.showNavItm ? !prevState.showNavList: true,
            }
        });
    }

    fetchNavListHandler = (category) => {
        this.props.onFetchNavList(category);
        this.setState({category})
    }

    render() {
        let navTipClass = ["site-header__tool-tip site-header__tool-tip--nav"];
        let navClass = ["site-header__menu--nav__opt"];
        let navList = null;
        let navOptClass = ["site-header__menu--nav__opt--det"];

        if (this.state.show) {
            navTipClass.push("site-header__tool-tip--nav__visible")
        }

        if (this.state.showNavList) {
            navClass.push("site-header__menu--nav__opt--visible");
        }

        if (this.state.showNavList && this.state.category) {
            let navOptCateg = this.state.category === 'post' ? 'site-header__menu--nav__opt--det__pt' : null;
            navOptCateg = this.state.category === 'question' ? 'site-header__menu--nav__opt--det__que' : navOptCateg;
            navOptCateg = this.state.category === 'onlineque' ? 'site-header__menu--nav__opt--det__pwt' : navOptCateg;
            navOptCateg = this.state.category === 'group' ? 'site-header__menu--nav__opt--det__onlineque' : navOptCateg;
            navOptCateg = this.state.category === 'poet' ? 'site-header__menu--nav__opt--det__grp' : navOptCateg;
            navOptClass.push(navOptCateg);
            navList =  this.props.navList  ? (
                <ul className={navOptClass.join(' ')}>
                    <NavigationLists 
                        content={this.props.navList}
                        category={this.props.navListCateg}/>
                </ul>
            ) : (
                <div className={`${navOptClass.join(' ')} site-header__menu--nav__opt--det__loading`}>
                    <Loader />
                </div>
            );
        }

        let navItm = (
            <Aux>
                { navList }
                {/* <ul className="site-header__menu--nav__opt--itm">
                    <li
                        onMouseEnter={this.fetchNavListHandler.bind(this, 'post')}
                        className={this.state.category === 'post' ? 'active-header-nav' : null}>
                        <FontAwesomeIcon 
                            icon={['fas', 'newspaper']} 
                            className="icon icon__site-header--nav__itm" />
                        News Feed
                        <FontAwesomeIcon 
                            icon={['fas', 'caret-right']} 
                            className="icon icon__site-header--nav__angle" />
                    </li>
                    <li
                        onMouseEnter={this.fetchNavListHandler.bind(this, 'question')}
                        className={this.state.category === 'question' ? 'active-header-nav' : null}>
                        <FontAwesomeIcon 
                            icon={['fas', 'question']} 
                            className="icon icon__site-header--nav__itm" />
                        Questions  
                        <FontAwesomeIcon 
                            icon={['fas', 'caret-right']} 
                            className="icon icon__site-header--nav__angle" />
                    </li>
                     <li
                        onMouseEnter={this.fetchNavListHandler.bind(this, 'onlineque')}
                        className={this.state.category === 'onlineque' ? 'active-header-nav' : null}>
                        <FontAwesomeIcon 
                            icon={['fas', 'coffee']} 
                            className="icon icon__site-header--nav__itm" />
                        Online Exam  
                        <FontAwesomeIcon 
                            icon={['fas', 'caret-right']} 
                            className="icon icon__site-header--nav__angle" />
                    </li> 
                    <li
                        onMouseEnter={this.fetchNavListHandler.bind(this, 'group')}
                        className={this.state.category === 'group' ? 'active-header-nav' : null}>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-graduate']} 
                            className="icon icon__site-header--nav__itm" />
                        Chat Room 
                        <FontAwesomeIcon 
                            icon={['fas', 'caret-right']} 
                            className="icon icon__site-header--nav__angle" />
                    </li>
                    <li
                        onMouseEnter={this.fetchNavListHandler.bind(this, 'poet')}
                        className={this.state.category === 'poet' ? 'active-header-nav' : null}>
                        <FontAwesomeIcon 
                            icon={['fas', 'book']} 
                            className="icon icon__site-header--nav__itm" />
                        Write Up
                        <FontAwesomeIcon 
                            icon={['fas', 'caret-right']} 
                            className="icon icon__site-header--nav__angle" />
                    </li>
                </ul> */}
                <ul className="site-header__menu--nav__opt--itm__sm-categ--cnt">
                    <li className="site-header__menu--nav__opt--itm__sm-categ--cnt-sm">
                        <a href="/post">
                            <FontAwesomeIcon 
                                icon={['fas', 'newspaper']} 
                                className="icon icon__site-header--nav__itm" />
                            News Feed
                        </a>
                    </li>
                    <li className="site-header__menu--nav__opt--itm__sm-categ--cnt-sm">
                        <a href="/question">
                        <FontAwesomeIcon 
                                icon={['fas', 'question']} 
                                className="icon icon__site-header--nav__itm" />
                            Questions  
                        </a>
                    </li>
                    <li className="site-header__menu--nav__opt--itm__sm-categ--cnt-sm">
                        <a href="/poet">
                            <FontAwesomeIcon 
                                icon={['fas', 'book']} 
                                className="icon icon__site-header--nav__itm" />
                            Write Up
                        </a>
                    </li>
                    <li className="site-header__menu--nav__opt--itm__sm-categ--cnt-sm">
                        <a href="/users">
                            <FontAwesomeIcon 
                                icon={['fas', 'users']} 
                                className="icon icon__site-header--nav__itm" />
                            Scholars
                        </a>
                    </li>
                    <li>
                        <a href="/group">
                            <FontAwesomeIcon 
                                icon={['fas', 'user-graduate']} 
                                className="icon icon__site-header--nav__itm" />
                            Chat Room
                        </a>
                    </li>
                    <li>
                        <a href="/conv">
                            <FontAwesomeIcon 
                                icon={['fas', 'comment']} 
                                className="icon icon__site-header--nav__itm" />
                            conversation
                        </a>
                    </li>
                    <li>
                        <a href="/acc/shared">
                            <FontAwesomeIcon 
                                icon={['fas', 'location-arrow']} 
                                className="icon icon__site-header--nav__itm" />
                            shared
                        </a>
                    </li>
                </ul>
            </Aux>
        )

        if (this.state.showNavItm) {
            navItm = (
                <ul className="site-header__menu--nav__opt--itm__sm-categ--cnt">
                    <li>
                        <a href="/post">
                            <FontAwesomeIcon 
                                icon={['fas', 'newspaper']} 
                                className="icon icon__site-header--nav__itm" />
                            News Feed
                        </a>
                    </li>
                    <li>
                        <a href="/question">
                        <FontAwesomeIcon 
                                icon={['fas', 'question']} 
                                className="icon icon__site-header--nav__itm" />
                            Questions  
                        </a>
                    </li>
                    <li>
                        <a href="/poet">
                            <FontAwesomeIcon 
                                icon={['fas', 'book']} 
                                className="icon icon__site-header--nav__itm" />
                            Write Up
                        </a>
                    </li>
                    <li>
                        <a href="/users">
                            <FontAwesomeIcon 
                                icon={['fas', 'users']} 
                                className="icon icon__site-header--nav__itm" />
                            Scholars
                        </a>
                    </li>
                    <li>
                        <a href="/group">
                            <FontAwesomeIcon 
                                icon={['fas', 'user-graduate']} 
                                className="icon icon__site-header--nav__itm" />
                            Chat Room
                        </a>
                    </li>
                    <li>
                        <a href="/conv">
                            <FontAwesomeIcon 
                                icon={['fas', 'comment']} 
                                className="icon icon__site-header--nav__itm" />
                            conversation
                        </a>
                    </li>
                    <li>
                        <a href="/acc/shared">
                            <FontAwesomeIcon 
                                icon={['fas', 'location-arrow']} 
                                className="icon icon__site-header--nav__itm" />
                            shared
                        </a>
                    </li>
                </ul>
            )

        }

        return (
            <div className="site-header__menu--nav">
                <div 
                    className="site-header__menu--nav__icn"
                    onMouseEnter={this.showNavTipHandler}
                    onMouseLeave={this.hidNavTipHandler}
                    onClick={this.showNavListHandler}>
                    <FontAwesomeIcon 
                        icon={['fas', 'bars']} 
                        className="icon icon__site-header--list" />
                </div>
                <div className={navTipClass.join(' ')}>
                    Options
                </div>
                {/* <div 
                    className="site-header__menu--nav__opt--itm__sm-categ"
                    onClick={this.showNavItmHandler}>
                     <FontAwesomeIcon 
                        icon={['fas', 'external-link-alt']} />
                </div> */}
                <nav className={navClass.join(' ')}>
                    { navItm }
                </nav> 
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
       navListCateg: state.header.navListCateg,
       navList: state.header.navList,
       hidNavList: state.header.hidNavList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onshowNavList: () => dispatch(actions.showNavList()),
        onFetchNavList: (category) => dispatch(actions.fetchNavlistInit(category))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationList);